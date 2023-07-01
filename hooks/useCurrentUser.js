import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useCurrentUser = (len) => {
  if (len) {
    const url = `/api/current?len=${len}`;
    const { data, error, isloading, mutate } = useSWR(url, fetcher);
    return { data, error, isloading, mutate };
  }
  return null;
};

export default useCurrentUser;
