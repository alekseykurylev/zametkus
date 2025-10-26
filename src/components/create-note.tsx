import { useNoteActions } from "../lib/store.ts";

export function CreateNote() {
  const { createNote } = useNoteActions();

  const handleCreateNote = () => {
    createNote().catch((e) => console.log(e));
  };

  return (
    <button className="border p-2" onClick={handleCreateNote}>
      Новая заметка
    </button>
  );
}
