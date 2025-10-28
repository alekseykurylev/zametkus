import type { Editor } from "@tiptap/react";

export function NoteFooter({ editor }: { editor: Editor }) {
  const wordsCount = editor?.storage.characterCount.words();
  const charactersCount = editor?.storage.characterCount.characters();

  return (
    <div className="flex items-center justify-between px-6 py-4 text-xs">
      <div>123</div>
      <div className="flex items-center gap-3">
        <div>{charactersCount} characters</div>
        <div>{wordsCount} words</div>
      </div>
    </div>
  );
}
