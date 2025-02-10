import React from "react";
import useDrawerStore from "../../../store/useDrawerStore";
import { useNavigate } from "react-router";
import TopBar from "../../layouts/TopBar";
import DataProvider from "../../../providers/DataProvider";
import { Typography } from "@material-tailwind/react";
import ButtonComponent from "../../../components/ButtonComponent";
import TableComponent from "../../../components/TableComponent";
import usePermissionStore from "../../../store/usePermissionStore";

const PermissionsPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { permissions, setPermission, setPermissions } = usePermissionStore();

  const columns = [
    {
      name: "Permission Name",
      selector: (row) => row.permission_name,
    },
  ];

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Permissions", goto: "/permissions" }]} />

      <DataProvider tableName="/permissions" setData={setPermissions}>
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
                    <ButtonComponent
                      onClick={() => {
                        navigate("/permissions/add-new");
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
                      data={permissions}
                      onClick={(row) => {
                        navigate("/permissions/view/" + row.permission_id);
                        setPermission(row);
                      }}
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

export default PermissionsPage;
