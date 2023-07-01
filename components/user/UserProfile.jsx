import userStore from "@/stores/server/userStore";
import UserAction from "./UserAction";
import client from "@/libs/prismaClient";
import Image from "next/image";

const UserProfile = async ({ user, isFollowing }) => {
  let userId = null;
  let followersCount = 0;

  console.log(userStore.user, " page user profile");

  try {
    // if (!userStore.user.email) return;

    const userFound = await client.user.findUnique({
      where: {
        email: userStore.user?.email,
      },
      select: {
        id: true,
      },
    });

    if (userFound) {
      userId = userFound.id;
    }

    console.log(userId);
  } catch (error) {
    console.log(error);
  }

  // console.log(userId);
  return (
    <div className="flex flex-col ">
      <div className="min-h-[20rem] w-full max-h-[20rem] relative overflow-hidden">
        <Image
          alt="cover image"
          src={user?.coverImage || "/images/coverimage.png"}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="shadow-xl  flex items-center h-full justify-between relative p-2">
        <div className="flex flex-col justify-center items-cenetr gap-2  basis-[75%]">
          <div className="flex flex-col gap-2">
            <p className=" text-lg font-bold">{user?.name}</p>
            <p className=" text-md font-semibold">@{user?.username}</p>
          </div>
          <p className="font-semibold text-md leading-loose ">{user?.bio}</p>
          <div className="flex gap-2">
            <p>Followers {followersCount}</p>
            <p>Following {user.followingIds?.length || 0}</p>
          </div>
        </div>
        <div className="basis-[25%] flex flex-col  items-end justify-center mt-2  mr-3 ">
          <div className="avatar border border-neutral-800 rounded-full absolute -top-20 right-4">
            <div className="w-24 h-24 rounded-full">
              <Image
                alt="user avatar"
                src={user.profileImage || "/images/user.png"}
                fill
              />
            </div>
          </div>
          <div className="w-24">
            <UserAction
              self={user.id === userId}
              isFollowing={isFollowing}
              userId={user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
