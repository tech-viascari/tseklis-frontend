import React from "react";
import useDrawerStore from "../../../store/useDrawerStore";
import { useNavigate } from "react-router";
import TopBar from "../../layouts/TopBar";
import DataProvider from "../../../providers/DataProvider";
import { Typography } from "@material-tailwind/react";
import ButtonComponent from "../../../components/ButtonComponent";
import usePermissionStore from "../../../store/usePermissionStore";
import useAuthStore from "../../../store/useAuthStore";
import PageDeniedComponent from "../../../components/PageDeniedComponent";
import TablePaginateComponent from "../../../components/TablePaginateComponent";

const PermissionsPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const {
    permissions,
    setPermission,
    setPermissions,
    totalRecords,
    pageSize,
    loading,
    fetchPermissions,
  } = usePermissionStore();

  const { user, hasPermission } = useAuthStore();

  const columns = [
    {
      name: "Permission Name",
      selector: (row) => row.permission_name,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToPermission(row);
            }}
          >
            {row.permission_name}
          </Typography>
        );
      },
    },
  ];

  const navigateToPermission = (row) => {
    navigate("/permissions/view/" + row.permission_id);
    setPermission(row);
  };

  if (!hasPermission(user, "View Permissions")) {
    return (
      <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
        <PageDeniedComponent />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Permissions", goto: "/permissions" }]} />

      <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
        <div className="pt-[60px]">
          <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-5 h-full">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <Typography variant="small" className="font-bold text-xl">
                    Permissions
                  </Typography>
                  <Typography variant="small" className="font-normal text-sm">
                    Here's the list of permissions.
                  </Typography>
                </div>
                <div>
                  {hasPermission(user, "Add Permissions") && (
                    <ButtonComponent
                      onClick={() => {
                        navigate("/permissions/add-new");
                      }}
                    >
                      Add new
                    </ButtonComponent>
                  )}
                </div>
              </div>
              <div className="flex-1 h-full">
                <div>
                  <TablePaginateComponent
                    columns={columns}
                    data={permissions}
                    onClick={navigateToPermission}
                    fetch={fetchPermissions}
                    perPage={pageSize}
                    totalRecords={totalRecords}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPage;
