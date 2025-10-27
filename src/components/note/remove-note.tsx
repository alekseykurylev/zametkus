import { useNoteActions, useNoteActive } from "../../lib/store.ts";

export function RemoveNote() {
  const activeId = useNoteActive();
  const { deleteNote } = useNoteActions();

  const handleRemove = () => {
    deleteNote(activeId ?? "").catch((e) => console.error(e));
  };

  return (
    <div>
      <button type="button" onClick={handleRemove} className="border">
        remove
      </button>
    </div>
  );
}
