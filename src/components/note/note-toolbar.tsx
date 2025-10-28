import { type Editor, useEditorState } from "@tiptap/react";
import { RemoveNote } from "./remove-note.tsx";

export function NoteToolbar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editorState?.canBold}
          // className={editorState?.isBold ? "is-active border" : "border"}
          className="rounded-full border border-neutral-600 bg-neutral-700/50 p-2"
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().unsetAllMarks().run()}
          className="rounded-full border border-neutral-600 bg-neutral-700/50 p-2"
        >
          Clear marks
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().clearNodes().run()}
          className="rounded-full border border-neutral-600 bg-neutral-700/50 p-2"
        >
          Clear nodes
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
          className="rounded-full border border-neutral-600 bg-neutral-700/50 p-2"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
          className="rounded-full border border-neutral-600 bg-neutral-700/50 p-2"
        >
          Redo
        </button>
      </div>
      <RemoveNote />
    </div>
  );
}
