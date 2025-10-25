import { AppShell } from "./components/ui";

function App() {
  return (
    <AppShell.Root>
      <AppShell.SideBar>
        <AppShell.Header>
          <h1 className="mb-2 text-2xl">Заметкус</h1>
          123
        </AppShell.Header>
        <AppShell.List>123</AppShell.List>
        <AppShell.Footer>login</AppShell.Footer>
      </AppShell.SideBar>
      <AppShell.Note>123213</AppShell.Note>
    </AppShell.Root>
  );
}

export default App;
