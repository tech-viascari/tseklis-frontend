// store/usePermissionStore.js

import { create } from "zustand";

const PermissionState = {
  permission_id: "",
  permission_name: "",
  created_at: new Date(),
  updated_at: new Date(),
};

// Create the Zustand store
const usePermissionStore = create((set) => ({
  permissions: [],
  permission: PermissionState,
  states: {
    permission: PermissionState,
  },
  setPermissions: (payload) => set({ permissions: payload }),
  setPermission: (payload) => set({ permission: payload }),
}));

export default usePermissionStore;
