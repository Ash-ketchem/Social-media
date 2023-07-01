"use client";

import axios from "axios";
import { useCallback, useEffect } from "react";
import followStore from "@/stores/followStore";
import modalStore from "@/stores/modalStore";

const UserAction = ({ userId, self, isFollowing }) => {
  const userFromFollowStore = followStore(
    (state) => state.users.find((user) => user.id === userId + "02"),
    userId + "02"
  );

  const addUser = followStore((state) => state.addUser);

  const followAction = followStore((state) => state.followAction);

  const onEditModalOpen = modalStore((state) => state.onEditModalOpen);

  console.log("followuser ", userFromFollowStore);

  useEffect(() => {
    if (!userFromFollowStore) {
      console.log("adding user");
      addUser({
        id: userId + "02",
        isFollowing,
      });
    }
  }, [userFromFollowStore]);

  const handleClick = useCallback(async () => {
    console.log("click handle");
    if (self) {
      return onEditModalOpen();
    } else {
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
    }
  }, [userFromFollowStore, userId]);
  return (
    <button
      className="btn btn-neutral btn-outline w-full"
      onClick={handleClick}
    >
      {self ? "edit" : userFromFollowStore?.isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default UserAction;
