import { useNoteActions, useNoteActive, useNotes } from "../../lib/store.ts";
import { Trash2 } from "lucide-react";
import { Button } from "../ui";

export function RemoveNote() {
  const activeId = useNoteActive();
  const notes = useNotes();
  const { deleteNote } = useNoteActions();

  const handleRemove = () => {
    deleteNote(activeId ?? "").catch((e) => console.error(e));
  };

  const isDisabled = notes.length === 1;

  return (
    <Button key={activeId} disabled={isDisabled} onClick={handleRemove}>
      <Trash2 />
    </Button>
  );
}
