import { AppShell } from "./components/ui";
import { useNoteActions } from "./lib/store.ts";
import { useEffect } from "react";
import { CreateNote } from "./components/create-note.tsx";
import { NotesList } from "./components/notes-list.tsx";
import { Note } from "./components/note/note.tsx";

function App() {
  const { load } = useNoteActions();

  useEffect(() => {
    load().catch();
  }, [load]);

  return (
    <AppShell.Root>
      <AppShell.SideBar>
        <AppShell.Header>
          <h1 className="mb-2 text-2xl">Заметкус</h1>
          <CreateNote />
        </AppShell.Header>
        <AppShell.List>
          <NotesList />
        </AppShell.List>
        <AppShell.Footer>login</AppShell.Footer>
      </AppShell.SideBar>
      <AppShell.Note>
        <Note />
      </AppShell.Note>
    </AppShell.Root>
  );
}

export default App;
