import { AppShell } from "./components/ui";
import { useNote, useNoteActions, useNoteActive } from "./lib/store.ts";
import { useEffect } from "react";
import { NotesList } from "./components/notes-list.tsx";
import { NoteEdit } from "./components/note/note-edit.tsx";

function App() {
  const { load } = useNoteActions();

  const activeId = useNoteActive();
  const note = useNote(activeId);

  useEffect(() => {
    load().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!note) return null;

  return (
    <AppShell.Root>
      <AppShell.Sidebar>
        <AppShell.Header>
          <h1 className="text-2xl">Редактус</h1>
        </AppShell.Header>
        <AppShell.List>
          <NotesList />
        </AppShell.List>
        <AppShell.Footer />
      </AppShell.Sidebar>
      <AppShell.Note>
        <NoteEdit key={activeId} note={note} />
      </AppShell.Note>
    </AppShell.Root>
  );
}

export default App;
