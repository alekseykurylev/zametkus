import { create } from "zustand";
import { getAllNotes, putNote, delNote } from "./db";
import { v4 as uuidv4 } from "uuid";
import type { Note } from "./types.ts";

type State = {
  notes: Note[];
  activeId?: string | null;
  actions: {
    load: () => Promise<void>;
    createNote: () => Promise<Note>;
    updateNote: (id: string, data: Partial<Note>) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    setActive: (id?: string | null) => void;
  };
};

const useNotesStore = create<State>((set, get) => {
  const createEmptyNote = async (): Promise<Note> => {
    const note: Note = {
      id: uuidv4(),
      title: "",
      content: "",
      updatedAt: Date.now(),
    };
    await putNote(note);
    return note;
  };

  return {
    notes: [],
    actions: {
      load: async () => {
        let notes = await getAllNotes();
        notes.sort((a, b) => b.updatedAt - a.updatedAt);

        if (notes.length === 0) {
          console.log("Notes");
          const newNote = await createEmptyNote();
          notes = [newNote];
        }

        set({ notes: notes, activeId: notes[0]?.id ?? null });
      },
      createNote: async () => {
        const note: Note = {
          id: uuidv4(),
          title: "",
          content: "",
          updatedAt: Date.now(),
        };
        await putNote(note);
        set((state) => ({ notes: [note, ...state.notes], activeId: note.id }));
        return note;
      },
      updateNote: async (id, data) => {
        const note = get().notes.find((n) => n.id === id);
        if (!note) return;

        const updatedNote = { ...note, ...data, updatedAt: Date.now() };
        await putNote(updatedNote);

        set((state) => ({
          notes: state.notes
            .map((n) => (n.id === id ? updatedNote : n))
            .sort((a, b) => b.updatedAt - a.updatedAt),
          activeId: id,
        }));
      },
      deleteNote: async (id) => {
        await delNote(id);
        set((state) => {
          const idx = state.notes.findIndex((n) => n.id === id);
          const next = state.notes.filter((n) => n.id !== id);

          let nextActive = state.activeId;

          if (state.activeId === id) {
            if (next.length === 0) {
              nextActive = null;
            } else if (idx < next.length) {
              nextActive = next[idx].id;
            } else {
              nextActive = next[0].id;
            }
          }

          return { notes: next, activeId: nextActive };
        });
      },
      setActive: (id) => set({ activeId: id ?? null }),
    },
  };
});

export const useNote = (id?: string | null) =>
  useNotesStore((state) => state.notes.find((n) => n.id === id));

export const useNoteActive = () => useNotesStore((state) => state.activeId);

export const useNotes = () => useNotesStore((state) => state.notes);

export const useNoteActions = () => useNotesStore((state) => state.actions);
