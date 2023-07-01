"use client";

import { useCallback } from "react";
import { LogOut } from "react-feather";
import { signOut } from "next-auth/react";

const LogoutItem = () => {
  const handleClick = useCallback(() => {
    signOut();
  }, []);

  return (
    <div
      className="flex xl:justify-center justify-center items-center mt-2"
      onClick={handleClick}
    >
      <div className="btn btn-neutral rounded-full p-4 h-full  flex gap-4 xl:justify-center xl:w-[90%] border-4 ">
        <LogOut className="xl:h-8 xl:w-8 sm:h-6 sm:w-6 md:h-8 md:w-8" />
        <p className="xl:block hidden font-semibold text-lg">Logout</p>
      </div>
    </div>
  );
};

export default LogoutItem;
