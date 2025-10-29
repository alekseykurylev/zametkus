import { openDB, type DBSchema } from "idb";
import type { Note } from "./types.ts";

const DB_NAME = "notes-db";
const STORE = "notes";
const DB_VERSION = 1;

interface NotesDB extends DBSchema {
  [STORE]: {
    key: string;
    value: Note;
    indexes: { "by-updatedAt": number };
  };
}

const dbPromise = openDB<NotesDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) {
      const store = db.createObjectStore(STORE, { keyPath: "id" });
      store.createIndex("by-updatedAt", "updatedAt");
    }
  },
});

export async function getAllNotes() {
  const db = await dbPromise;
  return await db.getAll(STORE);
}

export async function putNote(note: Note) {
  const db = await dbPromise;
  await db.put(STORE, note);
}

export async function delNote(id: string) {
  const db = await dbPromise;
  await db.delete(STORE, id);
}
