import { EditorContent, useEditor } from "@tiptap/react";
import { CharacterCount } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";
import { useDebouncedCallback } from "use-debounce";
import { ScrollArea } from "@base-ui-components/react/scroll-area";
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

      <ScrollArea.Root className="h-px grow">
        <ScrollArea.Viewport className="h-full overscroll-contain">
          <EditorContent
            editor={editor}
            role="presentation"
            className={cx("*:p-6")}
          />
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="pointer-events-none m-2 flex w-1 justify-center rounded bg-zinc-800 opacity-0 transition-opacity delay-300 data-[hovering]:pointer-events-auto data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
          <ScrollArea.Thumb className="w-full rounded bg-zinc-700" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <NoteFooter editor={editor} />
    </>
  );
}
