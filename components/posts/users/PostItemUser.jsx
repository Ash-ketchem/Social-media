import { addToast } from "@/components/toasts/Toasts";
import bookmarkStore from "@/stores/bookmarkStore";
import currentPostStore from "@/stores/currentPostStore";
import modalStore from "@/stores/modalStore";
import postStore from "@/stores/postStore";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Heart, MessageSquare, Bookmark } from "react-feather";

const PostItemUser = ({ postId, loggedUserId }) => {
  const router = useRouter();

  const post = postStore(
    (state) => state.userPosts.find((post) => post.id === postId),
    postId
  );

  const setLikeUser = postStore((state) => state.setLikeUser);
  const setBookmarkUser = postStore((state) => state.setBookmarkUser);
  const removeBookmark = bookmarkStore((state) => state.removeBookmark);

  const onLoginModalOpen = modalStore((state) => state.onLoginModalOpen);
  const onTweetModalOpen = modalStore((state) => state.onTweetModalOpen);
  const setCurrentPost = currentPostStore((state) => state.setCurrentPost);
  const addBookmark = bookmarkStore((state) => state.addBookmark);

  // console.log(post);

  if (!post) {
    return null;
  }

  const handleClick = useCallback(() => {
    router.push(`/post/${post?.id}`);
  }, [router]);

  const handleLike = useCallback(
    async (e) => {
      e.stopPropagation();
      console.log("like action");
      if (!loggedUserId) {
        return onLoginModalOpen();
      }
      setLikeUser(postId);
      try {
        const res = await axios.post("/api/like", {
          id: postId,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [post, loggedUserId]
  );
  const handleBookmark = useCallback(
    async (e) => {
      e.stopPropagation();

      if (!loggedUserId) {
        return onLoginModalOpen();
      }

      //api calls

      try {
        const res = await axios.post("/api/bookmark", {
          id: postId,
        });
        if (post.bookmarked) {
          removeBookmark(post.id);
        } else addBookmark(post);
        setBookmarkUser(post?.id);
      } catch (error) {
        addToast({
          type: "info",
          label: "something went wrong",
        });
        console.log(error);
      }
    },
    [post, loggedUserId]
  );

  const handleComment = useCallback(
    (e) => {
      e.stopPropagation();
      if (!loggedUserId) {
        return onLoginModalOpen();
      }
      setCurrentPost(post?.id);
      return onTweetModalOpen();
    },
    [loggedUserId]
  );

  return (
    <div onClick={handleClick} className="cursor-pointer">
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
            {post.liked ? (
              <Heart className=" rounded-full w-8 h-8 p-2" fill="red" />
            ) : (
              <Heart className=" rounded-full w-8 h-8 p-2" />
            )}
            <p>{post.likes}</p>
          </div>
          <div
            className="flex gap-2 justify-center items-center btn btn-ghost rounded-full hover:bg-sky-500"
            onClick={handleComment}
          >
            <MessageSquare className=" rounded-full w-8 h-8 p-2 " />
            <p>{post?.comments || 0}</p>
          </div>
          <div
            className=" flex justify-center items-center rounded-full btn btn-circle btn-ghost"
            onClick={handleBookmark}
          >
            <Bookmark
              className="rounded-full w-8 h-8 p-2 "
              fill={
                post?.bookmarked && loggedUserId === post.user.id
                  ? "orange"
                  : "none"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItemUser;
