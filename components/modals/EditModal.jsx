"use client";

import modalStore from "@/stores/modalStore";
import { useCallback, useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { addToast } from "../toasts/Toasts";
import { useRouter } from "next/navigation";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";

const EditModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const [onEditModalOpen, onEditModalClose] = modalStore([
    "onEditModalOpen",
    "onEditModalClose",
  ]);

  const { data: currentUser } = useCurrentUser("min");

  console.log("currentuser => ", currentUser);

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser?.user?.email || "");
      setName(currentUser?.user?.name || "");
    }
  }, [currentUser]);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setIsLoading(true);
        const res1 = await axios.post("/api/edit", {
          name,
          email,
          password,
        });

        if (res1?.error) {
          throw new Error(res1.error);
        }

        await signOut({
          redirect: false,
        });

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

        onEditModalClose();

        location.reload();
      } catch (error) {
        console.log(error);
        addToast({
          type: "error",
          label: "Something Went Wrong in here",
        });
      } finally {
        setIsLoading(false);
        setName("");
        setEmail("");
        setPassword("");
      }
    },
    [email, password, name, isLoading, router]
  );

  const bodyContent = (
    <div className="form-control flex flex-col gap-6 flex-center items-start mt-6">
      <div className="w-[95%]">
        <label className="input-group">
          <span className="basis-[30%]">name</span>
          <input
            type="text"
            value={name}
            placeholder="name"
            className="input input-bordered basis-[70%]"
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
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

  const footerContent = <div></div>;
  return (
    <>
      <dialog id="edit_modal" className="modal">
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
          <h3 className="font-bold text-lg text-center pb-1">Edit </h3>
          {bodyContent}
          <footer className="flex items-center justify-center w-[95%] mt-4">
            {footerContent}
          </footer>
        </form>
      </dialog>
    </>
  );
};

export default EditModal;
