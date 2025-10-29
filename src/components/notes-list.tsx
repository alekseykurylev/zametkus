import { useNoteActions, useNoteActive, useNotes } from "../lib/store.ts";
import { Item } from "./ui";

export function NotesList() {
  const notes = useNotes();
  const activeId = useNoteActive();
  const { setActive } = useNoteActions();

  return (
    <div className="flex flex-col">
      {notes.map((note) => (
        <Item
          key={note.id}
          data-active={note.id === activeId}
          onClick={() => setActive(note.id)}
        >
          <div>{note.title || "Без названия"}</div>
          <div>{new Date(note.updatedAt).toLocaleString()}</div>
        </Item>
      ))}
    </div>
  );
}
