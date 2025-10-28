import { EditorContent, useEditor } from "@tiptap/react";
import { CharacterCount } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";
import { useDebouncedCallback } from "use-debounce";
import { cx } from "../../lib/cva.ts";
import { useNoteActions, useNotes } from "../../lib/store.ts";
import type { Note } from "../../lib/types.ts";
import { getNoteTitle } from "../../lib/helpers.ts";
import { NoteToolbar } from "./note-toolbar.tsx";
import { NoteFooter } from "./note-footer.tsx";

export function NoteEdit({ note }: { note: Note }) {
  const { updateNote, deleteNote } = useNoteActions();
  const notes = useNotes();

  const debouncedUpdate = useDebouncedCallback((title, content) => {
    updateNote(note.id, { title, content }).catch();
  }, 200);

  const editor = useEditor({
    extensions: [StarterKit, CharacterCount],
    immediatelyRender: true,
    shouldRerenderOnTransaction: true,
    autofocus: "start",
    editorProps: {
      handlePaste: (view, event) => {
        event.preventDefault();
        const text = event.clipboardData?.getData("text/plain") || "";
        view.dispatch(view.state.tr.insertText(text));
        return true;
      },
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    content: note.content,
    onUpdate({ editor }) {
      const content = editor.getJSON();
      const title = getNoteTitle(editor);
      debouncedUpdate(title, content);
    },
    onFocus: () => {
      if (notes[0].id !== note.id && notes[0].title?.length === 0) {
        deleteNote(notes[0].id).catch();
      }
    },
  });

  return (
    <>
      <NoteToolbar editor={editor} />
      <EditorContent
        editor={editor}
        role="presentation"
        className={cx("grow overflow-y-auto *:h-full *:px-6")}
      />
      <NoteFooter editor={editor} />
    </>
  );
}
