"use client";

import postStore from "@/stores/postStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { addToast } from "../../toasts/Toasts";
import axios from "axios";
import PostItemUser from "./PostItemUser";

const PostFeedInfinteUser = ({
  initialsPosts,
  userId,
  cursor,
  loggedUserId,
}) => {
  //   if (!initialsPosts) return null;

  console.log(
    "time now => ",
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  const posts = postStore((state) => state.userPosts);
  const addPosts = postStore((state) => state.addPostsUser);
  const removePostsUser = postStore((state) => state.removePostsUser);

  const [loading, setLoading] = useState(false);

  const tarckerRef = useRef(null);
  const newCursor = useRef(cursor);
  const observer = useRef(null);
  const allDataFetched = useRef(false);

  const userIdRef = useRef(userId);

  const fetchPosts = useCallback(async () => {
    if (allDataFetched.current) {
      return addToast({
        type: "info",
        label: "no new data to fetch",
      });
    }

    try {
      setLoading(true);

      if (!cursor || !userId) return;

      // console.log(`/api/posts/${userId}?cursor=${newCursor.current}`);

      const res = await axios.get(
        `/api/posts/${userId}?cursor=${newCursor.current}`
      );

      // console.log(res);

      if (res.status === 200) {
        if (!res.data?.length) {
          allDataFetched.current = true;
        } else {
          if (newCursor.current !== res.data[0]?.id) {
            newCursor.current = res.data[0]?.id;
            addPosts(
              res.data
                .map((post) => ({
                  ...post,
                  liked: post.likeIds.includes(loggedUserId) ? true : false,
                  extra: null, // to update like count or not
                  likes: post.likeIds.length || 0,
                  comments: post?._count.comments || 0,
                }))
                .reverse()
            );
          }
        }
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
      // addToast({
      //   type: "error",
      //   label: "something went wrong",
      // });
      // allDataFetched.current = true;
    } finally {
      setLoading(false);
    }
  }, [loading, posts]);

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          if (!loading) {
            console.log("going for a fetch");
            // call the function to load posts
            fetchPosts();
          }
        }
      });
    }
    const currentObserver = observer.current;

    if (tarckerRef.current) {
      currentObserver.observe(tarckerRef.current);
    }
    return () => {
      //remove the observer
      if (tarckerRef.current) {
        currentObserver.unobserve(tarckerRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    console.log("initial posts changed");
    addPosts(
      initialsPosts.map((post) => ({
        ...post,
        liked: post.likeIds.includes(loggedUserId) ? true : false,
        // extra: null, // to update like count or not
        likes: post.likeIds.length || 0,
        comments: post?._count.comments || 0,
      }))
    );
  }, [initialsPosts]);

  return (
    <div className="flex flex-col gap-2">
      <>
        {posts
          .filter((post) => post.user.id === userIdRef.current)
          .map((post) => (
            <PostItemUser
              postId={post.id}
              key={post.id}
              loggedUserId={loggedUserId}
            />
          ))}
      </>

      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-dots loading-lg "></span>
        </div>
      ) : (
        <div className="h-[1px] bg-white border-1 w-full" ref={tarckerRef} />
      )}
    </div>
  );
};

export default PostFeedInfinteUser;
