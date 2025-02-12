// store/useRoleStore.js

import { create } from "zustand";

const RoleState = {
  role_id: "",
  role_name: "",
  permissions: [],
  created_at: new Date(),
  updated_at: new Date(),
};

// Create the Zustand store
const useRoleStore = create((set) => ({
  roles: [],
  role: RoleState,
  states: {
    role: RoleState,
  },
  setRoles: (payload) => set({ roles: payload }),
  setRole: (payload) => set({ role: payload }),
}));

export default useRoleStore;
