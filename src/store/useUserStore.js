// store/useUserStore.js

import { create } from "zustand";

const UserState = {
  user_id: "",
  slack_id: "",
  email: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  last_login: new Date(),
  password: "",
  status: "Active",
  roles: [],
  permissions: [],
  access_token: "",
  refresh_token: "",
  created_at: new Date(),
  updated_at: new Date(),
};

// Create the Zustand store
const useUserStore = create((set) => ({
  users: [],
  user: UserState,
  states: {
    user: UserState,
  },
  setUsers: (payload) => set({ users: payload }),
  setUser: (payload) => set({ user: payload }),
  getPermissions: (payload) => {
    if (payload) {
      return payload.map((permission) => permission.permission_name);
    }

    return [];
  },
}));

export default useUserStore;
