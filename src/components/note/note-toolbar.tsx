import { type Editor, useEditorState } from "@tiptap/react";
import { Collapsible } from "@base-ui-components/react/collapsible";
import { Bold, Redo, Undo, PanelLeftIcon } from "lucide-react";
import { RemoveNote } from "./remove-note.tsx";
import { Button, Separator } from "../ui";
import { CreateNote } from "./create-note.tsx";

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
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <div className="flex gap-6">
        <Collapsible.Trigger render={Button}>
          <PanelLeftIcon />
        </Collapsible.Trigger>
        <Separator orientation="vertical" />
        <CreateNote />
        <div className="flex items-center gap-2">
          <Button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editorState?.canBold}
            // className={editorState?.isBold ? "is-active border" : "border"}
          >
            <Bold />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editorState?.canUndo}
          >
            <Undo />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editorState?.canRedo}
          >
            <Redo />
          </Button>
        </div>
      </div>

      <RemoveNote />
    </div>
  );
}
