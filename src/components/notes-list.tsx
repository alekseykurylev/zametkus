import { useNoteActions, useNoteActive, useNotes } from "../lib/store.ts";
import { cx } from "../lib/cva.ts";

export function NotesList() {
  const notes = useNotes();
  const activeId = useNoteActive();
  const { setActive } = useNoteActions();

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <button
            onClick={() => setActive(note.id)}
            className={cx(note.id === activeId && "text-red-700")}
          >
            <div>{note.title || "Новая заметка"}</div>
            <div>{note.updatedAt}</div>
          </button>
        </li>
      ))}
    </ul>
  );
}
