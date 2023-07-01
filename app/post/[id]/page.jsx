"use client";

import usePost from "@/hooks/usePost";
import postStore from "@/stores/postStore";
import { useCallback, useEffect, useState } from "react";
import bookmarkStore from "@/stores/bookmarkStore";
import { Bookmark, Heart, MessageSquare } from "react-feather";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import postStoreUser from "@/stores/postStoreUser";
import CommentFeed from "@/components/comment/CommentFeed";
import modalStore from "@/stores/modalStore";
import Header from "@/components/common/Header";
import currentPostStore from "@/stores/currentPostStore";

const page = ({ params }) => {
  const [refresh, setRefresh] = useState(false);
  const [liked, setLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);

  const onLoginModalOpen = modalStore((state) => state.onLoginModalOpen);
  const setCurrentPost = currentPostStore((state) => state.setCurrentPost);
  const removeCurrentPost = currentPostStore(
    (state) => state.removeCurrentPost
  );

  const { id } = params;

  const { data: currentUser } = useCurrentUser("min");

  const loggedUserId = currentUser?.user?.id;

  const { data: post, mutate, isloading } = usePost(id);

  console.log(post, bookmarked);

  const gloabPost = postStore(
    (state) => state.posts.find((post) => post.id === id)
    // id
  );
  const UserPost = postStore(
    (state) => state.userPosts.find((post) => post.id === id)
    // id
  );

  const setLike = postStore((state) => state.setLike);
  const setLikeUser = postStore((state) => state.setLikeUser);
  const setBookmark = postStore((state) => state.setBookmark);
  const addBookmark = bookmarkStore((state) => state.addBookmark);
  const removeBookmark = bookmarkStore((state) => state.removeBookmark);
  const onTweetModalOpen = modalStore((state) => state.onTweetModalOpen);

  const handleLike = useCallback(async () => {
    if (!loggedUserId) {
      return onLoginModalOpen();
    }
    setLiked((state) => !state);
    setLikesCount((state) => (liked ? state - 1 : state + 1));
    setLike(post.id);
    setLikeUser(post.id);
    try {
      const res = await axios.post("/api/like", {
        id,
      });
      // mutate();
    } catch (error) {
      console.log(error);
    }
  }, [post, liked, loggedUserId]);

  const handleBookmark = useCallback(async () => {
    if (!loggedUserId) {
      return onLoginModalOpen();
    }

    try {
      //api calls
      const res = await axios.post("/api/bookmark", {
        id: post.id,
      });
      console.log("bookmarked ", bookmarked);

      // we dont have other ways to re-render the component
      setBookmarked((state) => !state);
    } catch (error) {
      console.log(error);
    }
  }, [post, loggedUserId]);

  const handleComment = useCallback(() => {
    if (!loggedUserId) {
      return onLoginModalOpen();
    }
    setCurrentPost(post?.id);
    return onTweetModalOpen();
  }, [loggedUserId, post]);

  useEffect(() => {
    console.log("post => ", post);
    if (post) {
      setCurrentPost(post?.id);
      console.log(currentUser?.user?.id);
      post.liked = post?.likeIds?.includes(currentUser?.user?.id)
        ? true
        : false;
      post.likes = post?.likeIds?.length || 0;
      setLikesCount(post.likes);
      setLiked(post?.liked);
      setComments(post?.comments || []);
      setBookmarked(post?.bookmarked);
      // setRefresh((state) => !state);
    }
    return () => {
      console.log("removing current post");
      removeCurrentPost();
    };
  }, [post, currentUser]);

  useEffect(() => {
    if (!post) return;
    if (!bookmarked) {
      console.log("removing bookmark");
      removeBookmark(post.id);
    } else {
      console.log("adding bookmark");
      addBookmark(post);
    }
    setBookmark(post?.id);
  }, [bookmarked, post]);

  return (
    <>
      <Header label="Post" showBackArrow />
      {isloading ? (
        <div>loading...</div>
      ) : !post ? (
        <div className="w-full h-screen justify-center items-center  flex">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="card w-full shadow-xl pl-1 ">
            <div className="card-body p-4 ">
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <p>{post.user.name}</p>
                  <p className="hover:underline cursor-pointer">
                    @{post.user.username}
                  </p>
                </div>
                <p>2h ago</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{post.body}</p>
              </div>
            </div>
            {/* <figure className="p-4">
  h-32 relative overflow-hidden
  <img
    src="https://source.unsplash.com/random/?cat"
    alt="cat"
    style={{
      objectFit: "scale-down",
    }}
    className="rounded-lg "
  />
</figure> */}
            <div className="w-full flex gap-12 justify-start items-center px-4 py-1">
              <div
                className="flex gap-2 justify-center items-center btn btn-ghost rounded-full hover:bg-red-500"
                onClick={handleLike}
              >
                {liked ? (
                  <Heart className=" rounded-full w-8 h-8 p-2" fill="red" />
                ) : (
                  <Heart className=" rounded-full w-8 h-8 p-2" />
                )}
                <p>{likesCount}</p>
              </div>
              <div
                className="flex gap-2 justify-center items-center btn btn-ghost rounded-full hover:bg-sky-500"
                onClick={handleComment}
              >
                <MessageSquare className=" rounded-full w-8 h-8 p-2 " />
                <p>{post?._count.comments || 0}</p>
              </div>
              <div
                className=" flex justify-center items-center rounded-full btn btn-circle btn-ghost"
                onClick={handleBookmark}
              >
                <Bookmark
                  className="rounded-full w-8 h-8 p-2"
                  fill={bookmarked ? "orange" : "none"}
                />
              </div>
            </div>
            <div className="mt-2 px-2 py-1">
              <CommentFeed
                loggedUserId={loggedUserId}
                comments={post?.comments}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
