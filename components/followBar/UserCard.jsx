import Image from "next/image";
import FollowAction from "./FollowAction";
import Link from "next/link";

const UserCard = ({ id, name, username, profileImage, isFollowing }) => {
  return (
    <Link href={`/users/${id}`} prefetch={false}>
      <li>
        <div className="flex justify-center items-center gap-2 flex-col">
          <div className="flex gap-4 w-full">
            <div className="avatar border border-neutral-800 rounded-full w-10 h-10">
              <div className="w-10 h-10 rounded-full">
                <img
                  alt="user avatar"
                  src={profileImage || "/images/user.png"}
                  // fill
                />
              </div>
            </div>
            <div className="w-full">
              <FollowAction userId={id} isFollowing={isFollowing} />
            </div>
          </div>
          <div className="flex gap-1 justify-start items-center w-full">
            <p className="text-md font-semibold leading-relaxed mr-2 line-clamp-1">
              {name}
            </p>
            <p className="underline text-md font-semibold cursor-pointer opacity-75 line-clamp-1">
              @{username}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default UserCard;
