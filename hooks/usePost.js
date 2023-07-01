import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const usePost = (postId) => {
  const url = postId ? `/api/post/${postId}` : null;

  const { data, error, isloading, mutate } = useSWR(url, fetcher);
  return { data, error, isloading, mutate };
};

export default usePost;
