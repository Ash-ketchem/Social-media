"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import userStore from "@/stores/userStore";
import { useEffect } from "react";

const SyncClientStore = () => {
  //syncing client stores with server

  const { data: currentUser } = useCurrentUser("min");

  const setUser = userStore((state) => state.setUser);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser.user);
    }
  }, [currentUser]);

  return null;
};

export default SyncClientStore;
