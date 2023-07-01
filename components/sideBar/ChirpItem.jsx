"use client";

import modalStore from "@/stores/modalStore";
import { useCallback } from "react";
import { Feather } from "react-feather";

const ChirpItem = ({ loggedIn }) => {
  console.log("logged in chirp", loggedIn);
  const onLoginModalOpen = modalStore((state) => state.onLoginModalOpen);
  const onTweetModalOpen = modalStore((state) => state.onTweetModalOpen);

  const handleClick = useCallback(() => {
    if (loggedIn) {
      return onTweetModalOpen();
    } else return onLoginModalOpen();
  }, [loggedIn]);

  return (
    <div
      className="flex xl:justify-center justify-center items-center mt-2"
      onClick={handleClick}
    >
      <div className="btn btn-info rounded-full xl:px-2  p-4 h-full  flex gap-4 xl:justify-center xl:w-[90%] border-4 hover:bg-opacity-80">
        <Feather className="xl:h-8 xl:w-8 sm:h-6 sm:w-6 md:h-8 md:w-8 " />
        <p className="xl:block hidden font-semibold text-lg ">Clip</p>
      </div>
    </div>
  );
};

export default ChirpItem;
