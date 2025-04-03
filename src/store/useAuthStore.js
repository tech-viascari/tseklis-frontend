// store/useAuthStore.js

import { create } from "zustand";

const UserState = {
  user_id: "",
  slack_id: "",
  email: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  last_login: "",
  status: "",
  picture: "",
  permissions: [],
  roles: [],
};

// Create the Zustand store
const useAuthStore = create((set) => ({
  user: UserState, // Default user state (no user logged in)
  login: (userData) => set({ user: userData }), // Set the user data on login
  logout: () => {
    set({ user: null });
  }, // Reset user on logout
  hasPermission: (user, permission_name) => {
    if (user == null || user.permissions == undefined || permission_name == "")
      return false;
    return user.permissions.some(
      (permission) => permission.permission_name === permission_name
    );
  },
  hasRole: (user, role_name) => {
    if (user.roles == undefined || role_name == "") return false;
    return user.roles.some((role) => role.role_name === role_name);
  },
}));

export default useAuthStore;
