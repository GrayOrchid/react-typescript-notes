import { Container } from "react-bootstrap";
import { useMemo } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import NewNote from "./components/NewNote";
import { NoteData, RawNote, Tag } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteLIst";
import NoteLayout from "./components/NoteLayout";
import Note from "./components/Note";
import Edit from "./components/Edit";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  let [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  let [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  let noteWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
      ];
    });
  }
  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }
  function updateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagsIds: tags.map((tag) => tag.id) };
        }
        return note;
      });
    });
  }
  function deleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={noteWithTags} aviableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              addTag={addTag}
              aviableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={noteWithTags} />}>
          <Route index element={<Note deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <Edit addTag={addTag} aviableTags={tags} onSubmit={updateNote} />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
