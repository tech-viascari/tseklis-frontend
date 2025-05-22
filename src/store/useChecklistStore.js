import { create } from "zustand";

const CheckListState = {
  checklist_id: "",
  list_item: "",
  checked: false,
};

// Create the Zustand store
const useCheckListStore = create((set) => ({
  checkLists: [],
  checkList: CheckListState,
  states: {
    checkList: CheckListState,
  },
  setCheckLists: (payload) => set({ checkLists: payload }),
  setCheckList: (payload) => set({ checkList: payload }),
}));

export default useCheckListStore;
