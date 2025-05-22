import { create } from "zustand";

const NoteState = {
  note_id: "",
  sender_id: "",
  note_message: "",
  timestamp: new Date(),
};

// Create the Zustand store
const useNoteStore = create((set) => ({
  notes: [],
  note: NoteState,
  states: {
    note: NoteState,
  },
  setNotes: (payload) => set({ notes: payload }),
  setNote: (payload) => set({ note: payload }),
}));

export default useNoteStore;
