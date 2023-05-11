import { NoteData, Tag } from "../types";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

interface EditProps {
  onSubmit: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  aviableTags: Tag[];
}

const Edit: React.FunctionComponent<EditProps> = ({
  onSubmit,
  aviableTags,
  addTag,
}) => {
  let note = useNote();
  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        aviableTags={aviableTags}
        addTag={addTag}
      />
    </>
  );
};

export default Edit;
