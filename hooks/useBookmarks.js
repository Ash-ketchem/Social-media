import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useBookmarks = () => {
  const url = "/api/bookmark/";

  const { data, error, isloading, mutate } = useSWR(url, fetcher);
  return { data, error, isloading, mutate };
};

export default useBookmarks;
