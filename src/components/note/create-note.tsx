import { SquarePen } from "lucide-react";
import { useNote, useNoteActions, useNoteActive } from "../../lib/store.ts";
import { Button } from "../ui";

export function CreateNote() {
  const activeId = useNoteActive();
  const note = useNote(activeId);
  const { createNote } = useNoteActions();

  const handleCreateNote = () => {
    createNote().catch((e) => console.log(e));
  };

  const isDisabled = note?.title?.length === 0;

  return (
    <Button
      key={note?.id}
      disabled={isDisabled}
      onPointerDown={(e) => e.preventDefault()}
      onClick={handleCreateNote}
    >
      <SquarePen />
    </Button>
  );
}
