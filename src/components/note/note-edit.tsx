import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cx } from "../../lib/cva.ts";
import { useNoteActions } from "../../lib/store.ts";
import type { Note } from "../../lib/types.ts";
import { getNoteTitle } from "../../lib/helpers.ts";

export function NoteEdit({ note }: { note?: Note }) {
  const { updateNote } = useNoteActions();

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: true,
    shouldRerenderOnTransaction: true,
    autofocus: "start",
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    content: note?.content,
    onUpdate({ editor }) {
      const content = editor.getJSON();
      const title = getNoteTitle(editor);
      updateNote(note?.id ?? "", { title, content }).catch();
    },
  });

  return (
    <div className="flex h-full flex-col">
      <EditorContent
        editor={editor}
        role="presentation"
        className={cx("grow overflow-y-auto *:h-full *:px-6")}
      />
    </div>
  );
}
