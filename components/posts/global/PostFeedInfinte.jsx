"use client";

import postStore from "@/stores/postStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PostItem from "./PostItem";
import usePosts from "@/hooks/usePost";
import { addToast } from "../../toasts/Toasts";
import PostItemUser from "../users/PostItemUser";

import axios from "axios";

const PostFeedInfinte = ({ initialsPosts, userId, cursor, loggedUserId }) => {
  if (!initialsPosts) return null;

  // let posts, addPosts;

  const posts = postStore((state) => state.posts);
  const addPosts = postStore((state) => state.addPosts);

  // const [posts, addPosts] = postStore([
  //   userId ? "userPosts" : "posts",
  //   userId ? "addPostsUser" : "addPosts",
  // ]);

  const [loading, setLoading] = useState(false);

  const tarckerRef = useRef(null);
  const newCursor = useRef(cursor);
  const observer = useRef(null);
  const allDataFetched = useRef(false);
  const userIdRef = useRef(userId);

  console.log("logged user id ", loggedUserId);

  const fetchPosts = useCallback(async () => {
    if (allDataFetched.current) {
      return addToast({
        type: "info",
        label: "no new data to fetch",
      });
    }

    try {
      setLoading(true);

      if (!cursor) return;

      // const { data, error, isloading, mutate } = usePosts(newCursor.current);

      const res = await axios.get(
        userId
          ? `/api/posts/${userId}?cursor=${newCursor.current}`
          : `/api/posts?cursor=${newCursor.current}`
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
        {userId
          ? posts
              .filter((post) => post.user.id === userIdRef.current)
              .map((post) => (
                <PostItemUser
                  postId={post.id}
                  key={post.id}
                  loggedUserId={loggedUserId}
                />
              ))
          : posts.map((post) => (
              <PostItem
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

export default PostFeedInfinte;
