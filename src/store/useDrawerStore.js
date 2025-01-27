// store/useDrawerStore.js

import { create } from "zustand";

// Create the Zustand store
const useDrawerStore = create((set) => ({
  open: true,
  setOpen: (openData) => set({ open: openData }),
}));

export default useDrawerStore;
