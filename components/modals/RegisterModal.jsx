"use client";

import modalStore from "@/stores/modalStore";
import axios from "axios";
import { useCallback, useState } from "react";
import { addToast } from "../toasts/Toasts";

const RegisterModal = () => {
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

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setIsLoading(true); // no input should be accepted during db query

        const res = await axios.post("/api/register", {
          name,
          username,
          email,
          password,
        });

        // console.log(res.data.res.id, res);

        if (!res.data.res.id) {
          throw new Error("something went wrong");
        }
        //sucess toast

        addToast({
          type: "success",
          label: "Regsitered successfully",
        });

        onRegisterModalClose();
      } catch (error) {
        console.log(error);

        // error toast
        addToast({
          type: "error",
          label: "Something Went Wrong",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [name, username, email, password]
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="example@info.com"
            className="input input-bordered basis-[70%]"
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="w-[95%]">
        <label className="input-group flex">
          <span className="basis-[30%]">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="john Doe"
            className="input input-bordered basis-[70%]"
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="w-[95%]">
        <label className="input-group flex">
          <span className="basis-[30%]">user name</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="user123_1"
            className="input input-bordered basis-[70%]"
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="w-[95%]">
        <label className="input-group">
          <span className="basis-[30%]">Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="passsword"
            className="input input-bordered basis-[70%]"
            disabled={isLoading}
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
        Already a user ?{" "}
        <span
          className="underline cursor-pointer"
          onClick={toggle}
          disabled={isLoading}
        >
          login
        </span>
      </p>
    </div>
  );

  return (
    <dialog id="register_modal" className="modal">
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
        <h3 className="font-bold text-lg text-center pb-1">Regsiter </h3>
        {bodyContent}
        <footer className="flex items-center justify-center w-[95%] mt-4">
          {footerContent}
        </footer>
      </form>
    </dialog>
  );
};

export default RegisterModal;
