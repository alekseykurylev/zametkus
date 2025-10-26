import { useNoteActions, useNotes } from "../lib/store.ts";

export function NotesList() {
  const notes = useNotes();
  const { setActive } = useNoteActions();

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <button onClick={() => setActive(note.id)}>
            <div>{note.title}</div>
            <div>{note.updatedAt}</div>
          </button>
        </li>
      ))}
    </ul>
  );
}
