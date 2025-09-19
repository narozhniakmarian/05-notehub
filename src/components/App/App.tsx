import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useNotes } from "../../hooks/useNotes";
import { toast, ToastContainer } from "react-toastify";
import css from "./App.module.css";
// import { ToastContainer } from "react-hot-toast";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { useDebounce } from "use-debounce";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isError, isSuccess } = useNotes(
    page,
    debouncedSearch
  );
  const notes = data?.notes ?? [];

  useEffect(() => {
    if (
      isSuccess &&
      (data?.notes?.length ?? 0) === 0 &&
      debouncedSearch.trim()
    ) {
      toast.error("No notes found for your request.");
    }
  }, [data?.notes, isSuccess, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return (
    <>
      <div className={css.app}>
        <ToastContainer
          theme="auto"
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={(val) => setSearch(val)} />
          {isSuccess && notes.length > 0 && data?.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages ?? 0}
              page={page}
              setPage={(newPage) => setPage(newPage)}
            />
          )}

          <button className={css.button} onClick={() => setIsOpenModal(true)}>
            Create note
          </button>
          {isOpenModal && (
            <Modal onClose={() => setIsOpenModal(false)}>
              <NoteForm onClose={() => setIsOpenModal(false)} />
            </Modal>
          )}
        </header>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {isSuccess && notes?.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
}

export default App;
