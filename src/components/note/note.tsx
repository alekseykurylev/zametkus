import { NoteEdit } from "./note-edit.tsx";
import { useNote, useNoteActive } from "../../lib/store.ts";

export function Note() {
  const activeId = useNoteActive();
  const note = useNote(activeId);

  if (!note) return null;
  return <NoteEdit key={activeId} note={note} />;
}
