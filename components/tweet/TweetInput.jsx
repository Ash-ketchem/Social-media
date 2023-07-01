"use client";

import { useCallback, useEffect, useState } from "react";
import { addToast } from "../toasts/Toasts";
import axios from "axios";
import postStore from "@/stores/postStore";
import currentPostStore from "@/stores/currentPostStore";
import usePost from "@/hooks/usePost";

const TweetInput = ({}) => {
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const addPostOnAll = postStore((state) => state.addPostOnAll);
  // const addPostOnAll = postStore((state) => state.addPosts);
  const posts = postStore((state) => state.posts);

  const setCommentGeneral = postStore((state) => state.setCommentGeneral);

  const currentPostId = currentPostStore((state) => state.currentPostId);
  const removeCurrentPost = currentPostStore(
    (state) => state.removeCurrentPost
  );

  console.log("current post ", currentPostId);
  console.log("iscomment ", isComment);

  useEffect(() => {
    if (!currentPostId) {
      setIsComment(false);
    } else {
      setIsComment(true);
    }
    console.log("changing iscomment to false");
  }, [currentPostId]);

  const handleChange = useCallback(
    (e) => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
      setTweet(e.target.value);
    },

    [tweet]
  );
  const { mutate } = usePost(currentPostId);

  useEffect(() => {
    console.log(posts.map((post) => post.body));
  }, [posts]);

  const handleClick = useCallback(async () => {
    // post the tweet
    if (!tweet) {
      addToast({
        label: "text required",
        type: "info",
      });
    } else {
      // post to api
      try {
        setIsLoading(true);

        const url = isComment ? "/api/comment" : "/api/tweet";

        const postBody = isComment
          ? { body: tweet, postId: currentPostId }
          : { body: tweet };

        console.log("postbody ", postBody);

        const res = await axios.post(url, postBody);
        if (res.status !== 200) {
          throw new Error("something went wrong");
        }

        if (!isComment && !currentPostId) {
          addPostOnAll({
            ...res.data,
            liked: false,
            likes: 0,
          });
        } else {
          console.log("setting comment general");
          mutate(); // mutate the post
          setCommentGeneral(currentPostId, "add");
        }

        addToast({
          type: "sucess",
          label: "tweeted",
        });

        setTweet("");
      } catch (error) {
        console.log(error);
        addToast({
          label: "something went wrong",
          type: "info",
        });
      } finally {
        setIsLoading(false);
        removeCurrentPost();
      }
    }
  }, [tweet, isLoading]);

  return (
    <div className="flex flex-col gap-2 py-4">
      <div>
        <textarea
          className="w-full pl-1 resize-none outline-none peer bg-transparent"
          value={tweet}
          onChange={handleChange}
          placeholder="say something sweet!!"
          disabled={isLoading}
        ></textarea>
        <div className="w-full h-[1px] bg-info peer-focus:visible invisible mt-1"></div>
      </div>

      <div className="flex w-full justify-end items-center mt-4">
        <button
          className="btn btn-info btn-outline rounded-full w-[40%] leading-relaxed tracking-widest "
          onClick={handleClick}
          disabled={isLoading}
        >
          clip
        </button>
      </div>
    </div>
  );
};

export default TweetInput;
