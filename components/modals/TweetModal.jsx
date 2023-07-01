"use client";

import modalStore from "@/stores/modalStore";
import { useCallback, useRef, useState } from "react";
import { addToast } from "../toasts/Toasts";
import TweetInput from "../tweet/TweetInput";
import currentPostStore from "@/stores/currentPostStore";

const TweetModal = () => {
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const labelRef = useRef(null);

  const tweetModalOpen = modalStore((state) => state.tweetModalOpen);
  const onTweetModalClose = modalStore((state) => state.onTweetModalClose);

  const currentPostId = currentPostStore((state) => state.currentPostId);
  const removeCurrentPost = currentPostStore(
    (state) => state.removeCurrentPost
  );

  console.log("currentpostid from tweetmodal => ", currentPostId);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setIsLoading(true);

        //api call

        // if (res?.error) {
        //   throw new Error(res.error);
        // }

        addToast({
          type: "success",
          label: "tweeted",
        });

        onTweetModalClose();
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
    [tweet, isLoading]
  );

  const bodyContent = (
    <div className="form-control mt-6">
      <TweetInput isComment />
    </div>
  );

  return (
    <>
      <dialog id="tweet_modal" className="modal">
        <form
          method="dialog"
          className="modal-box shadow-inner border-[1px] border-neutral rounded-lg"
        >
          <button
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              // labelRef.current.style.opacity = 1;
              removeCurrentPost();
            }}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-center pb-1" ref={labelRef}>
            {currentPostId ? "Comment" : "Tweet"}
          </h3>
          {bodyContent}
          <footer className="flex items-center justify-center w-[95%] mt-4"></footer>
        </form>
      </dialog>
    </>
  );
};

export default TweetModal;
