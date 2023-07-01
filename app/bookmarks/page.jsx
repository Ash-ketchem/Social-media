import BookmarkFeed from "@/components/bookmarks/BookmarkFeed";
import userStore from "@/stores/server/userStore";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import client from "@/libs/prismaClient";

const page = async () => {
  const session = await getServerSession(authOptions);

  let cursor = null;
  let initialsPosts = null;

  // console.log(session, "session");
  if (session) {
    const { id } = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    userStore.user = { ...session?.user, id };
    userStore.loggedIn = true;

    try {
      initialsPosts = await client.post.findMany({
        where: {
          userId: id,
          bookmarked: true,
        },
        take: 5,
        select: {
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
        },
      });

      if (!initialsPosts) return null;

      if (initialsPosts.length) {
        cursor = initialsPosts[initialsPosts.length - 1]?.id;
        console.log(cursor, "cursor");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    userStore.user = null;
    userStore.loggedIn = false;
  }

  return (
    <div>
      <BookmarkFeed
        loggedUserId={userStore.user?.id}
        initialsPosts={initialsPosts}
        cursor={cursor}
      />
    </div>
  );
};

export default page;
