import type { Content } from "@tiptap/react";

export type Note = {
  id: string;
  title?: string;
  content: Content;
  updatedAt: number;
};
