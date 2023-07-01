"use client";

import modalStore from "@/stores/modalStore";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { addToast } from "../toasts/Toasts";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const [
    onLoginModalOpen,
    onRegisterModalOpen,
    onRegisterModalClose,
    onLoginModalClose,
  ] = modalStore([
    "onLoginModalOpen",
    "onRegisterModalOpen",
    "onRegisterModalClose",
    "onLoginModalClose",
  ]);

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setIsLoading(true);
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          throw new Error(res.error);
        }

        addToast({
          type: "success",
          label: "Logged In",
        });

        onLoginModalClose();

        router.refresh();
      } catch (error) {
        console.log(error);
        addToast({
          type: "error",
          label: "Something Went Wrong",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [email, password]
  );

  const toggle = useCallback(() => {
    if (window.register_modal.open) {
      onRegisterModalClose();
      onLoginModalOpen();
    } else {
      onLoginModalClose();
      onRegisterModalOpen();
    }
  }, []);

  const bodyContent = (
    <div className="form-control flex flex-col gap-6 flex-center items-start mt-6">
      <div className="w-[95%]">
        <label className="input-group flex">
          <span className="basis-[30%]">Email</span>
          <input
            type="text"
            placeholder="example@info.com"
            value={email}
            className="input input-bordered basis-[70%]"
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <div className="w-[95%]">
        <label className="input-group">
          <span className="basis-[30%]">Password</span>
          <input
            type="password"
            value={password}
            placeholder="password"
            className="input input-bordered basis-[70%]"
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="flex items-center justify-center w-[95%]">
        <button
          className="btn w-[90%] btn-outline"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          submit
        </button>
      </div>
    </div>
  );

  const footerContent = (
    <div>
      <p>
        New user?{" "}
        <span
          className="underline cursor-pointer"
          onClick={toggle}
          disabled={isLoading}
        >
          create an account
        </span>
      </p>
    </div>
  );
  return (
    <>
      <dialog id="login_modal" className="modal">
        <form
          method="dialog"
          className="modal-box shadow-inner border-[1px] border-neutral rounded-lg"
        >
          <button
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-center pb-1">Login </h3>
          {bodyContent}
          <footer className="flex items-center justify-center w-[95%] mt-4">
            {footerContent}
          </footer>
        </form>
      </dialog>
    </>
  );
};

export default LoginModal;
