import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../types";

interface NoteLayoutProps {
  notes: Note[];
}

const NoteLayout: React.FunctionComponent<NoteLayoutProps> = ({ notes }) => {
  let { id } = useParams();
  let note = notes.find((n) => n.id === id);

  if (note === null) return <Navigate to="/" replace />;
  return <Outlet context={note} />;
};

export function useNote() {
  return useOutletContext<Note>();
}
export default NoteLayout;
