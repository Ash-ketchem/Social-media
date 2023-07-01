"use client";

import LoginModal from "@/components/modals/LoginModal";
import modalStore from "@/stores/modalStore";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const onLoginModalOpen = modalStore((state) => state.onLoginModalOpen);
  const router = useRouter();
  const { data, isloading } = useCurrentUser("min");
  console.log(data);

  useEffect(() => {
    if (data) {
      const currentUser = data.user;
      if (currentUser?.id) {
        if (router.asPath !== "/profile") {
          router.replace(`/users/${currentUser.id}`);
        } else {
          router.push("/");
        }
      } else {
        onLoginModalOpen();
      }
    }
  }, [data]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="loading loading-ring  w-24 h-24"></div>
    </div>
  );
};

export default page;
