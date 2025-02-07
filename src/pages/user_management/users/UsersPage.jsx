import React from "react";
import UnderConstructionComponent from "../../../components/UnderConstructionComponent";
import MainContent from "../../layouts/MainContent";
import TopBar from "../../layouts/TopBar";
import QuotesProvider from "../../../providers/QuotesProvider";
import { Typography } from "@material-tailwind/react";
import ButtonComponent from "../../../components/ButtonComponent";
import TableComponent from "../../../components/TableComponent";
import useDrawerStore from "../../../store/useDrawerStore";
import useQuoteStore from "../../../store/useQuoteStore";
import { useNavigate } from "react-router";
import DataProvider from "../../../providers/DataProvider";
import useUserStore from "../../../store/useUserStore";

const UsersPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { users, setUser, setUsers } = useUserStore();

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Name",
      selector: (row) => {
        return `${row.first_name} ${row.last_name}`
      },
    },
    {
      name: "Last Login",
      selector: (row) => row.last_login,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Users", goto: "/users" }]} />

      <DataProvider tableName="/users" setData={setUsers}>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      Users
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the list of users.
                    </Typography>
                  </div>
                  <div>
                    <ButtonComponent
                      onClick={() => {
                        navigate("/users/add-new");
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
                      data={users}
                      onClick={(row) => {
                        navigate("/quotes/view/" + row.quote_id);
                        setUser(row);
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

export default UsersPage;
