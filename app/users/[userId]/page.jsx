import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/common/Header";
import PostFeed from "@/components/posts/global/PostFeed";
// import PostFeedUser from "@/components/posts/PostFeedUser";
import UserProfile from "@/components/user/UserProfile";
import client from "@/libs/prismaClient";
import userStore from "@/stores/server/userStore";
import { getServerSession } from "next-auth";

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  let myfollowing;

  if (session?.user?.email) {
    const { id, followingIds } = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        followingIds: true,
      },
    });
    userStore.user = { ...session?.user, id };
    userStore.loggedIn = true;
    myfollowing = followingIds || [];
  } else {
    userStore.user = null;
    userStore.loggedIn = false;
  }

  const { userId } = params;
  let user;
  try {
    if (userId && typeof userId === "string") {
      user = await client.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          bio: true,
          email: true,
          coverImage: true,
          profileImage: true,
          username: true,
          followingIds: true,
        },
      });

      const followersCount = await client.user.count({
        where: {
          followingIds: {
            has: userId,
          },
        },
      });

      user = { ...user, followersCount };
    }
  } catch (error) {
    console.log(error);
  }

  // console.log(user, userId, "indi");

  return (
    <div>
      <Header showBackArrow label="user" />

      {user ? (
        <>
          <UserProfile
            user={user}
            isFollowing={myfollowing?.includes(userId)}
          />
          <PostFeed userId={userId} />
        </>
      ) : (
        <div className="text-red-400">no user exists</div>
      )}
    </div>
  );
};

export default page;
