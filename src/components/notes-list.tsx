import { useNoteActions, useNoteActive, useNotes } from "../lib/store.ts";
import { Item } from "./ui/item.tsx";

export function NotesList() {
  const notes = useNotes();
  const activeId = useNoteActive();
  const { setActive } = useNoteActions();

  return (
    <div className="flex flex-col">
      {notes.map((note) => (
        <Item
          key={note.id}
          className={note.id === activeId ? "bg-neutral-800" : ""}
          onClick={() => setActive(note.id)}
        >
          <div>{note.title || "Новая заметка"}</div>
          <div>{new Date(note.updatedAt).toLocaleString()}</div>
        </Item>
      ))}
    </div>
  );
}
