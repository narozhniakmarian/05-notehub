import { useQuery } from "@tanstack/react-query";
import noteFetch from "../services/noteService";
import type { FetchProps } from "../services/noteService";
export const useNotes = (page: number, prePage = 100) => {
  return useQuery<FetchProps>({
    queryKey: ["noteHubKey", page],
    queryFn: () => noteFetch("", page, prePage),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
