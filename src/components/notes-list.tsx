import { useNoteActions, useNoteActive, useNotes } from "@/lib/store.ts";
import { cx } from "cva";

export function NotesList() {
  const notes = useNotes();
  const activeId = useNoteActive();
  const { setActive } = useNoteActions();

  return (
    <div className="flex flex-col">
      {notes.map((note) => (
        <button
          type="button"
          key={note.id}
          onClick={() => setActive(note.id)}
          className={cx(
            "space-y-1 rounded-md bg-transparent p-4 text-left",
            note.id === activeId && "bg-white/5",
          )}
        >
          <div className="line-clamp-2">{note.title || "Без названия"}</div>
          <div className="text-sm text-zinc-400">
            {new Date(note.updatedAt).toLocaleString()}
          </div>
        </button>
      ))}
    </div>
  );
}
