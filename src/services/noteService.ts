import axios from "axios";
import type { Note, NotePost } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const API_TOKEN = import.meta.env.VITE_NOTEHUB_API_KEY;
export interface FetchProps {
  notes: Note[];
  totalPages: number;
}
export interface FetchCreate {
  notePost: NotePost;
}

const buildFetchConfig = (params?: Record<string, string | number>) => ({
  params,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

async function noteFetch(
  search: string,
  page: number,
  perPage = 16
): Promise<FetchProps> {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) {
    params.search = search.trim();
  }

  const response = await axios.get<FetchProps>(BASE_URL, {
    params: { page, perPage: 16 },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return response.data;
}

export default noteFetch;

export async function createNote(notePost: NotePost): Promise<Note> {
  const postNewItem = await axios.post<Note>(
    BASE_URL,
    notePost,
    buildFetchConfig()
  );
  return postNewItem.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteNoteItem = await axios.delete<Note>(
    `${BASE_URL}/${id}`,
    buildFetchConfig()
  );
  return deleteNoteItem.data;
}
