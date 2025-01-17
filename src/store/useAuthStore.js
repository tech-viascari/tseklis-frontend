// store/useAuthStore.js

import { create } from "zustand";

// Create the Zustand store
const useAuthStore = create((set) => ({
  user: null, // Default user state (no user logged in)
  login: (userData) => set({ user: userData }), // Set the user data on login
  logout: () => {
    set({ user: null });
  }, // Reset user on logout
}));

export default useAuthStore;
