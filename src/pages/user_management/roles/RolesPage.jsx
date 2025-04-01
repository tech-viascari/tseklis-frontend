import React from "react";
import useDrawerStore from "../../../store/useDrawerStore";
import { useNavigate } from "react-router";
import TopBar from "../../layouts/TopBar";
import DataProvider from "../../../providers/DataProvider";
import { Typography } from "@material-tailwind/react";
import ButtonComponent from "../../../components/ButtonComponent";
import TableComponent from "../../../components/TableComponent";
import useRoleStore from "../../../store/useRoleStore";
import { setDocumentTitle } from "../../../utils/global";

const RolesPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { roles, setRole, setRoles } = useRoleStore();

  const columns = [
    {
      name: "Role Name",
      selector: (row) => row.role_name,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToRoles(row);
            }}
          >
            {row.role_name}
          </Typography>
        );
      },
    },
    {
      name: "Permissions",
      selector: (row) => row.role_id,
      cell: (row) => {
        return (
          <>
            <div
              key={`role-${row.role_id}`}
              className="flex flex-row gap-2 w-full"
              onClick={() => {
                navigateToRoles(row);
              }}
            >
              {[0, 1].map((element, index) => {
                if (row.permissions.length == 0) return;
                if (index == 1 && row.permissions.length == 1) return;
                return (
                  <div
                    key={`permission-${row.permissions[index].permission_id}`}
                    className="flex flex-col text-center justify-center border rounded-full border-gray w-full h-5 px-5 line-clamp-1 text-nowrap"
                  >
                    <Typography
                      variant="small"
                      className="font-normal text-sm text-dark"
                    >
                      {row.permissions[index].permission_name}
                    </Typography>
                  </div>
                );
              })}
              {row.permissions.length > 2 && (
                <div
                  key={`permission-${
                    row.permissions[row.permissions.length - 1].permission_id
                  }`}
                  className="flex flex-col text-center justify-center border rounded-full border-gray w-full h-5 line-clamp-1 text-nowrap"
                >
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {`+ ${row.permissions.length - 2}`}
                  </Typography>
                </div>
              )}
            </div>
          </>
        );
      },
    },
  ];

  const navigateToRoles = (row) => {
    navigate("/roles/view/" + row.role_id);
    setRole(row);
  };

  setDocumentTitle(`Roles`);

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Roles", goto: "/roles" }]} />

      <DataProvider tableName="/roles" setData={setRoles}>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      Roles
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the list of roles.
                    </Typography>
                  </div>
                  <div>
                    <ButtonComponent
                      onClick={() => {
                        navigate("/roles/add-new");
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
                      data={roles}
                      onClick={navigateToRoles}
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

export default RolesPage;
