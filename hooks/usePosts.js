import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const usePosts = (userId, cursor) => {
  const url = postId
    ? `/api/posts/${userId}?cursor=${cursor}`
    : `/api/posts?cursor=${cursor}`;

  const { data, error, isloading, mutate } = useSWR(url, fetcher);
  return { data, error, isloading, mutate };
};

export default usePosts;
