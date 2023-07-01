import Header from "@/components/common/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import userStore from "@/stores/server/userStore";
import PostFeed from "@/components/posts/global/PostFeed";
import client from "@/libs/prismaClient";
import TweetBar from "@/components/tweet/TweetBar";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // console.log(session, "session");
  if (session) {
    const { id } = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    userStore.user = { ...session?.user, id };
    userStore.loggedIn = true;
  } else {
    userStore.user = null;
    userStore.loggedIn = false;
  }
  console.log(userStore?.user, "userstore page");

  return (
    <main className="">
      <Header label="Home" showBackArrow />
      <TweetBar />
      <PostFeed />
    </main>
  );
}
