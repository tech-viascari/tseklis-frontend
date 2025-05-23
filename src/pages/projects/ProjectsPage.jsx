import React, { useEffect } from "react";
import TopBar from "../layouts/TopBar";
import PageDeniedComponent from "../../components/PageDeniedComponent";
import useDrawerStore from "../../store/useDrawerStore";
import { useNavigate } from "react-router";
import useQuoteStore from "../../store/useQuoteStore";
import useAuthStore from "../../store/useAuthStore";
import { Avatar, Progress, Typography } from "@material-tailwind/react";
import DataProvider from "../../providers/DataProvider";
import TableComponent from "../../components/TableComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { formattedDate, setDocumentTitle } from "../../utils/global";
import AssigneeAvatarComponent from "../../components/AssigneeAvatarComponent";
import useProjectStore from "../../store/useProjectStore";

const ProjectsPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { quotes, setQuote, setQuotes } = useQuoteStore();

  const { user, hasPermission } = useAuthStore();

  const { projects, setProjects, setProject, states } = useProjectStore();

  const columns = [
    {
      name: "Project Name",
      selector: (row) => row.project_name,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToProject(row)}
          >
            {row.project_name}
          </Typography>
        );
      },
    },
    {
      name: "Assignee",
      selector: (row) => row.project_name,
      cell: (row) => {
        let assignees = row.assignee;
        if (assignees == undefined || assignees == 0) return;
        return (
          <div
            onClick={() => {
              navigateToProject(row);
            }}
          >
            <AssigneeAvatarComponent assignees={assignees} size="xs" />
          </div>
        );
      },
    },
    {
      name: "Project Start Date",
      selector: (row) => row.start_date,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm bg-gray/40 px-3 rounded-xl"
            onClick={() => {
              navigateToProject(row);
            }}
          >
            {formattedDate(row.start_date)}
          </Typography>
        );
      },
    },
    {
      name: "Project Target Due Date",
      selector: (row) => row.target_date,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm bg-gray/40 px-3 rounded-xl"
            onClick={() => {
              navigateToProject(row);
            }}
          >
            {formattedDate(row.target_date)}
          </Typography>
        );
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToProject(row);
            }}
          >
            {row.status[0].status}
          </Typography>
        );
      },
    },
    {
      name: "Pending Action From",
      selector: (row) => row.pending_action_from,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToProject(row);
            }}
          >
            {row.pending_action_from}
          </Typography>
        );
      },
    },
    {
      name: "Date Completed",
      selector: (row) => row.date_completed,
      cell: (row) => {
        if (row.date_completed == null) return;
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToProject(row);
            }}
          >
            {row.date_completed}
          </Typography>
        );
      },
    },
    {
      name: "Google Project Folder",
      selector: (row) => row.google_project_folder,
      cell: (row) => {
        if (row.google_project_folder.name == "") return;
        return (
          <div className="flex flex-row">
            {row.google_project_folder.name != "" &&
            row.google_project_folder.link != "" ? (
              <a
                href={
                  row.google_project_folder.name != "" &&
                  row.google_project_folder.link != ""
                    ? row.google_project_folder.link
                    : ""
                }
                target="_blank"
              >
                <Typography
                  variant="small"
                  className="text-sm font-normal text-blue-500 underline"
                >
                  {row.google_project_folder.name != "" &&
                    row.google_project_folder.link != "" &&
                    row.google_project_folder.name}
                </Typography>
              </a>
            ) : (
              <Typography variant="small" className="text-sm font-normal">
                --
              </Typography>
            )}
          </div>
        );
      },
    },
    {
      name: "Executed Documents",
      selector: (row) => row.project_name,
      cell: (row) => {
        if (row.executed_documents.length == 0) return;
        return (
          <>
            {formData.executed_documents.length > 0 ? (
              formData.executed_documents.map((doc) => {
                if (doc.name == "") return;
                return (
                  <div className="flex flex-row">
                    <a href={doc.link != "" ? doc.link : ""} target="_blank">
                      <Typography
                        variant="small"
                        className="text-sm font-normal text-blue-500 underline"
                      >
                        {doc.name}
                      </Typography>
                    </a>
                  </div>
                );
              })
            ) : (
              <Typography variant="small" className="text-sm font-normal">
                --
              </Typography>
            )}
          </>
        );
      },
    },
  ];

  const navigateToProject = (row) => {
    navigate("/projects/view/" + row.project_id);
    setProject(row);
  };

  useEffect(() => {
    setDocumentTitle("Projects");
  }, []);

  useEffect(() => {
    const data = [
      {
        project_name: "INCORPORATION",
        start_date: new Date(),
        target_date: new Date().setDate(new Date().getDate() + 10),
        assignee: [
          {
            user_id: "u001",
            name: "Alice Smith",
            picture:
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
          },
          {
            user_id: "u002",
            name: "Emma Johnson",
            picture:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80",
          },
          {
            user_id: "u003",
            name: "Richard Hayes",
            picture:
              "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
          },
          {
            user_id: "u004",
            name: "Ethan Walker",
            picture:
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
          },
          {
            user_id: "u005",
            name: "Lucas Carter",
            picture:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
          },
        ],
        status: [
          {
            project_timestamps_id: "1f9bdcdb-efc4-4127-8781-0926157c8de7",
            project_id: "10457bf7-1129-4d3c-b10d-f2ae4e0d5279",
            user_id: "b1e3ce17-4b01-48fa-aef8-8f41cf677176",
            status: "Not Started",
            remarks: "",
            datetime: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            full_name: "Benjie Pecson",
          },
        ],
        checklist: [
          {
            checklist_id: "1",
            list_item:
              "Reservation of Business Name with the Securities and Exchange Commission (SEC)",
            checked: false,
          },
          {
            checklist_id: "2",
            list_item: "Submission of Documents to SEC",
            checked: false,
          },
          {
            checklist_id: "3",
            list_item:
              "Registration with Local Government Units (LGUs) of the location where you want to establish your business",
            checked: false,
          },
          {
            checklist_id: "4",
            list_item:
              "Registration with the Bureau of Internal Revenue (BIR) for corporate taxation",
            checked: false,
          },
          {
            checklist_id: "5",
            list_item:
              "Registration with other Government Agencies (for employer registration if employing individuals)",
            checked: false,
          },

          {
            checklist_id: "6",
            list_item:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus alias ab distinctio dolore eligendi iusto obcaecati est adipisci blanditiis, explicabo labore voluptatum praesentium ipsum dicta nisi expedita ea numquam delectus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum cumque quas libero vitae est voluptas quisquam natus sequi eum doloribus dolor hic saepe accusamus, minus asperiores repellat excepturi corrupti? Commodi!",
            checked: false,
          },
        ],
        pending_action_from: "",
        date_completed: null,
        google_project_folder: { ...states.attachment_view },
        executed_documents: [],
        project_id: 2,
        desc: "This is a test project",
      },
      {
        project_name: "INCORPORATION",
        start_date: new Date(),
        target_date: new Date().setDate(new Date().getDate() + 10),
        assignee: [],
        status: [
          {
            project_timestamps_id: "1f9bdcdb-efc4-4127-8781-0926157c8de7",
            project_id: "10457bf7-1129-4d3c-b10d-f2ae4e0d5279",
            user_id: "b1e3ce17-4b01-48fa-aef8-8f41cf677176",
            status: "Not Started",
            remarks: "",
            datetime: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            full_name: "Benjie Pecson",
          },
        ],
        checklist: [
          {
            checklist_id: "1",
            list_item:
              "Reservation of Business Name with the Securities and Exchange Commission (SEC)",
            checked: false,
          },
          {
            checklist_id: "2",
            list_item: "Submission of Documents to SEC",
            checked: false,
          },
        ],
        pending_action_from: "Client",
        date_completed: null,
        google_project_folder: { ...states.attachment_view },
        executed_documents: [],
        project_id: 1,
        desc: "This is a test project",
      },
    ];

    const newProjects = data.map((project) => {
      return {
        ...states.project,
        project_id: project.project_id,
        project_name: project.project_name,
        checklist: project.checklist,
        desc: project.desc,
        start_date: project.start_date,
        target_date: project.target_date,
        assignee: project.assignee,
        status: project.status,
        pending_action_from: project.pending_action_from,
        date_completed: project.date_completed,
        google_project_folder: project.google_project_folder,
        executed_documents: project.executed_documents,
      };
    });

    if (projects.length == 0) {
      setProjects(newProjects);
    }
  }, []);

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Projects", goto: "/projects" }]} />

      <DataProvider tableName="/quotes" setData={() => {}}>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      All Projects
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the list of all projects.
                    </Typography>
                  </div>
                  <div>
                    <ButtonComponent
                      onClick={() => {
                        navigate("/projects/add-new");
                      }}
                    >
                      Add new
                    </ButtonComponent>
                  </div>
                </div>
                <div className="flex-1 h-full">
                  <div>
                    <TableComponent
                      columns={columns}
                      data={projects}
                      onClick={navigateToProject}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DataProvider>
    </div>
  );
};

export default ProjectsPage;
