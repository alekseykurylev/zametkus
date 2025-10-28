import { useNoteActions, useNoteActive } from "../../lib/store.ts";
import { Trash2 } from "lucide-react";

export function RemoveNote() {
  const activeId = useNoteActive();
  const { deleteNote } = useNoteActions();

  const handleRemove = () => {
    deleteNote(activeId ?? "").catch((e) => console.error(e));
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleRemove}
        className="rounded-full border border-neutral-600 bg-neutral-700/50 p-2"
      >
        <Trash2 size="16" />
      </button>
    </div>
  );
}
