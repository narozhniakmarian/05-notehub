import { useQuery } from "@tanstack/react-query";
import noteFetch from "../services/noteService";
import type { NotesResponse } from "../services/noteService";

export const useNotes = (page: number, search = "", prePage = 100) => {
  return useQuery<NotesResponse>({
    queryKey: ["noteHubKey", page, search],
    queryFn: () => noteFetch(search, page, prePage),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
