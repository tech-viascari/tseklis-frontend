import { create } from "zustand";

// const ProjectState = {
//   project_id: "",
//   project_name: "",
//   project_type: "",
//   project_requester: "",
//   project_assignee: "",
//   project_remarks: "",
//   project_legal_entity: "",
//   project_notes: [],
//   project_updates: [],
//   project_prereq: [],
//   project_tasks: [],
// };

// // Create the Zustand store
// const useProjectStore = create((set) => ({
//   projects: [],
//   project: ProjectState,
//   states: {
//     project: ProjectState,
//   },
//   setProjects: (payload) => set({ projects: payload }),
//   setProject: (payload) => set({ project: payload }),
// }));

const attachmentViewState = {
  name: "",
  link: "",
};

const ProjectState = {
  project_id: "",
  project_name: "",
  desc: "",
  assignee: [],
  start_date: null,
  target_date: null,
  status: [],
  pending_action_from: "",
  date_completed: null,
  google_project_folder: attachmentViewState,
  executed_documents: [],
};

// Create the Zustand store
const useProjectStore = create((set) => ({
  projects: [],
  project: ProjectState,
  states: {
    project: ProjectState,
    attachment_view: attachmentViewState,
  },
  setProjects: (payload) => set({ projects: payload }),
  setProject: (payload) => set({ project: payload }),
}));

export default useProjectStore;
