// store/usePermissionStore.js

import { create } from "zustand";
import axiosInstance from "../utils/axiosHelper";

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
  page: 1, // Initial page (react-data-table uses 1-based index)
  pageSize: 10, // Number of items per page
  totalRecords: 0, // Total records count
  loading: false, // Loading state
  fetchPermissions: async (page, pageSize) => {
    set({ loading: true });
    try {
      // Fetch data from API
      const response = await axiosInstance.get("/permissions/getPaginate", {
        params: {
          page: page,
          limit: pageSize,
        },
      });

      // Assuming the response contains data and total count
      const { data, total } = response.data;

      set({
        permissions: data,
        totalRecords: total,
        loading: false,
      });

      return;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      set({ loading: false });
    }
  },
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize }),
  setPermissions: (payload) => set({ permissions: payload }),
  setPermission: (payload) => set({ permission: payload }),
}));

export default usePermissionStore;
