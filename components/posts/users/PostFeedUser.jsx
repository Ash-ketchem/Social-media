import client from "@/libs/prismaClient";
import userStore from "@/stores/server/userStore";
import PostFeedInfinteUser from "./PostFeedInfiniteUser";
import PostFeedInfinte from "../global/PostFeedInfinte";

const PostFeedUser = async ({ userId }) => {
  console.log(
    "time now => ",
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  const postsNum = 5;
  let cursor = null;
  let posts = [];

  const loggedUserId = userStore.user?.id;

  const selectObj = {
    id: true,
    body: true,
    images: true,
    likeIds: true,
    createdAt: true,
    bookmarked: true,
    _count: {
      select: { comments: true },
    },
    user: {
      select: {
        id: true,
        name: true,
        username: true,
      },
    },
  };

  try {
    if (userId) {
      posts = await client.post.findMany({
        take: postsNum,
        where: {
          userId: userId,
        },

        select: selectObj,
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await client.post.findMany({
        take: postsNum,

        select: selectObj,
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // console.log("posts", posts.length);

    if (posts.length) {
      cursor = posts[posts.length - 1]?.id;
      // console.log(cursor, "cursor");
    }
  } catch (error) {
    console.log(error);
  }

  if (!posts) return null;

  return (
    <div className="px-2">
      <PostFeedInfinte
        userId={userId}
        initialsPosts={posts}
        // initialsPosts={[]}
        cursor={cursor}
        loggedUserId={loggedUserId}
      />
    </div>
  );
};

export default PostFeedUser;
