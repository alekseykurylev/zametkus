import { useNoteActions, useNoteActive } from "../../lib/store.ts";
import { Trash2 } from "lucide-react";
import { Button } from "../ui";

export function RemoveNote() {
  const activeId = useNoteActive();
  const { deleteNote } = useNoteActions();

  const handleRemove = () => {
    deleteNote(activeId ?? "").catch((e) => console.error(e));
  };

  return (
    <Button onClick={handleRemove}>
      <Trash2 />
    </Button>
  );
}
