import { create } from "zustand";

const ProjectState = {
  project_id: "",
  project_name: "",
  project_type: "",
  project_requester: "",
  project_assignee: "",
  project_remarks: "",
  project_legal_entity: "",
  project_notes: [],
  project_updates: [],
  project_prereq: [],
  project_tasks: [],
};

// Create the Zustand store
const useProjectStore = create((set) => ({
  projects: [],
  project: ProjectState,
  states: {
    project: ProjectState,
  },
  setProjects: (payload) => set({ projects: payload }),
  setProject: (payload) => set({ project: payload }),
}));

export default useProjectStore;
