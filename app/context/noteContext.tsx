'use client'

import { createContext, useContext, useState, useCallback } from "react";
import { Note } from "../notebook/types";

interface NoteContextType {
    currentNote: Note | null;
    setCurrentNote: (note: Note | null) => void;
    getNote: (id: string) => Promise<void>;
    noteList: Note[];
    setNoteList: (noteList: Note[]) => void;
}

export const NoteContext = createContext<NoteContextType | null>(null);

export function NoteProvider({ children }: { children: React.ReactNode }) {
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [noteList, setNoteList] = useState<Note[]>([]);

    const getNote = useCallback(async (id: string) => {
        try {
            const res = await fetch(`/api/notebook/${id}`);
            const data = await res.json();
            setCurrentNote(data[0]);
        } catch (error) {
            console.error(error);
        }
    }, [setCurrentNote]);

    return (
        <NoteContext.Provider value={{ currentNote, setCurrentNote, getNote, noteList, setNoteList }}>
            {children}
        </NoteContext.Provider>
    )
}

export function useNote() {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error("useNote must be used within a NoteProvider");
    }

    return context;
}