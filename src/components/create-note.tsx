import { useNote, useNoteActions, useNoteActive } from "../lib/store.ts";

export function CreateNote() {
  const activeId = useNoteActive();
  const note = useNote(activeId);
  const { createNote } = useNoteActions();

  const handleCreateNote = () => {
    createNote().catch((e) => console.log(e));
  };

  const isDisabled = note?.title?.length === 0;

  return (
    <button
      key={note?.id}
      className="border p-2 disabled:border-gray-200"
      disabled={isDisabled}
      onPointerDown={(e) => e.preventDefault()}
      onClick={handleCreateNote}
    >
      Новая заметка
    </button>
  );
}
