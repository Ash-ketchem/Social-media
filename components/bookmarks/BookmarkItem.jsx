import bookmarkStore from "@/stores/bookmarkStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Eye, Heart, MessageSquare, X } from "react-feather";
import { addToast } from "../toasts/Toasts";
import axios from "axios";
import postStore from "@/stores/postStore";

const BookmarkItem = ({ bookmark }) => {
  console.log(bookmark);
  const removeBookmark = bookmarkStore((state) => state.removeBookmark);
  const setBookmark = postStore((state) => state.setBookmark);
  const router = useRouter();

  const handleDelete = useCallback(
    async (e) => {
      e.stopPropagation();

      try {
        const res = await axios.post("/api/bookmark", {
          id: bookmark.id,
        });

        if (res.status !== 200) {
          throw new Error("request failed");
        }
        removeBookmark(bookmark?.id);
        setBookmark(bookmark?.id);
      } catch (error) {
        console.log(error);
        addToast({
          type: "info",
          label: "something went wrong",
        });
      }
    },
    [bookmark?.id]
  );

  const handleSee = useCallback(() => {
    router.push(`/post/${bookmark.id}`);
  }, [router]);
  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="card-actions justify-end">
            <button className="btn btn-square btn-sm" onClick={handleSee}>
              <Eye />
            </button>
            <button className="btn btn-square btn-sm" onClick={handleDelete}>
              <X />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex w-fit">
              <p className="mr-4">{bookmark.user.name}</p>
              <p className="hover:underline cursor-pointer mr-4">
                @{bookmark.user.username}
              </p>
              <p>2h ago</p>
            </div>
            <div>
              <p>{bookmark.body}</p>
            </div>
            {/* <div className="flex justify-start items-center">
              <div className="flex mr-4 gap-1 justify-center items-center">
                <Heart className="" />
                <p>{bookmark.likes || 0}</p>
              </div>
              <div className="flex gap-1 justify-center items-center">
                <MessageSquare className="" />
                <p>{bookmark._count.comments || 0}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkItem;
