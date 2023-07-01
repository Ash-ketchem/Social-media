import client from "@/libs/prismaClient";
import UserCard from "./UserCard";
import userStore from "@/stores/server/userStore";

const FollowUsers = async () => {
  let users = [];
  let myFollowing;

  const loggedUserId = userStore.user?.id;

  try {
    users = await client.user.findMany({
      select: {
        name: true,
        username: true,
        profileImage: true,
        id: true,
        followingIds: true,
      },
    });

    myFollowing =
      users.find((user) => user.id === loggedUserId)?.followingIds || [];
  } catch (error) {
    console.log(error);
  }

  console.log(
    ":myfollowing",
    users.find((user) => user.id === loggedUserId)?.followingIds
  );
  return (
    <div className="flex w-full items-center justify-center ">
      <ul className="menu rounded-box flex flex-col justify-center gap-0.5 shadow-md  w-[95%]">
        <li className="menu-title">You might like them</li>
        {users
          ?.filter((user) => user.id !== loggedUserId)
          .map((user) => (
            <UserCard
              name={user?.name}
              username={user?.username}
              id={user?.id}
              profileImage={user?.profileImage}
              key={user?.id}
              isFollowing={myFollowing?.includes(user?.id)}
            />
          ))}
        <li className="mt-1 cursor-pointer px-1">more...</li>
      </ul>
    </div>
  );
};

export default FollowUsers;
