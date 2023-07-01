"use client";

import { ArrowLeft } from "react-feather";
import { useRouter } from "next/navigation";
import userStore from "@/stores/userStore";

const Header = ({ label, showBackArrow }) => {
  const router = useRouter();

  const currentUser = userStore((state) => state.user);

  console.log(currentUser, "from header");

  return (
    <header className="max-w-32 py-2 px-1 border-b-[1px] border-neutral-300">
      <div className="flex justify-start items-center w-full gap-12 ">
        {showBackArrow && (
          <div
            className="cursor-pointer btn btn-ghost rounded-full p-1 w-fit h-ful"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-10 h-10 " />
          </div>
        )}
        <p className="text-2xl font-bold leading-relaxed ">{label}</p>
        <p>{currentUser?.name}</p>
      </div>
    </header>
  );
};

export default Header;
