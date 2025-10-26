import type { Editor } from "@tiptap/react";

export function getNoteTitle(editor: Editor) {
  if (!editor) return "";
  const text = editor.getText().trim();
  if (!text) return "Новая заметка";
  return text.split("\n")[0];
}
