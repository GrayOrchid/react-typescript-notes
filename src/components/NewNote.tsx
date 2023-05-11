import { NoteData, Tag } from "../types";
import NoteForm from "./NoteForm";

interface NewNoteProps {
    onSubmit:(data:NoteData)=>void
    addTag:(tag:Tag) => void
    aviableTags:Tag[]
}
 
const NewNote: React.FunctionComponent<NewNoteProps> = ({onSubmit,aviableTags,addTag}) => {
    return ( 
        <>
        <h1>New Note</h1>
        <NoteForm onSubmit={onSubmit} aviableTags={aviableTags} addTag={addTag} />
        </>
     );
}
 
export default NewNote;