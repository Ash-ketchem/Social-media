"use client";

import { useCallback, useEffect } from "react";
import { addToast } from "../toasts/Toasts";
import axios from "axios";
import followStore from "@/stores/followStore";

const FollowAction = ({ userId, isFollowing }) => {
  const userFromFollowStore = followStore(
    (state) => state.users.find((user) => user.id === userId + "01"),
    userId + "01"
  );

  const addUser = followStore((state) => state.addUser);

  const followAction = followStore((state) => state.followAction);

  useEffect(() => {
    if (!userFromFollowStore) {
      console.log("adding user");
      addUser({
        id: userId + "01",
        isFollowing,
      });
    }
  }, [userFromFollowStore]);

  console.log("followuser ", userFromFollowStore);

  const handleFollow = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post("/api/follow", {
          followingId: userId,
        });
        if (res.status !== 200) {
          throw new Error("something went wrong");
        }
        followAction(
          [userId + "01", userId + "02"],
          userFromFollowStore?.isFollowing ? "remove" : "add"
        );
      } catch (error) {
        console.log(error);
        followAction([userId + "01", userId + "02"], "remove");
        addToast({
          type: "info",
          label: "something went wrong",
        });
      }
    },
    [userId, userFromFollowStore]
  );

  return (
    <button
      className="btn btn-neutral rounded-full w-full"
      onClick={handleFollow}
    >
      {userFromFollowStore?.isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowAction;
