import React, { useState, UseState } from "react";
import { useNavigate, useParams } from "react-router";
import TopBar from "../layouts/TopBar";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import ButtonComponent from "../../components/ButtonComponent";
import useDrawerStore from "../../store/useDrawerStore";
import useQuoteStore from "../../store/useQuoteStore";
import ReviewComponent from "../../components/ReviewComponent";
import { formatNumberWithCommaAndDecimal, getName } from "../../utils/global";
import {
  HiMiniExclamationCircle,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import DialogComponent from "../../components/DialogComponent";
import { toast } from "sonner";
import TimelineComponent from "../../components/TimelineComponent";

const ViewQuotePage = () => {
  const { quote_id } = useParams();

  const { open, setOpen } = useDrawerStore();

  const { quote, quotes, setQuotes, setQuote } = useQuoteStore();

  const navigate = useNavigate();

  const [statusDialog, setStatusDialog] = useState(false);
  const statusHandlerDialog = () => {
    setStatusDialog(!statusDialog);
  };

  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteHandlerDialog = () => {
    setDeleteDialog(!deleteDialog);
  };

  const [loadingDialog, setLoadingDialog] = useState(false);
  const loadingHandlerDialog = () => {
    setLoadingDialog(!loadingDialog);
  };

  const handleEditDetails = () => {
    setQuote(quote);
    navigate(`/quotes/update/${quote.quote_number}`);
  };

  return (
    <div className="w-full relative">
      <TopBar
        items={[
          { title: "Quotes", goto: "/quotes" },
          {
            title: quote.quote_number,
            goto: `/quotes/view/${quote.quote_number}`,
          },
        ]}
      />

      <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
        <div className="pt-[60px]">
          <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-5 h-full">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-row gap-8">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      {quote.quote_name}
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      {quote.quote_number}
                    </Typography>
                  </div>
                  <div></div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex w-max flex-row gap-2">
                    <ButtonComponent
                      variant="outlined"
                      className="py-1 px-4 text-secondary text-sm"
                      onClick={statusHandlerDialog}
                    >
                      {quote.status}
                    </ButtonComponent>

                    <div>
                      <Menu>
                        <MenuHandler>
                          <Button
                            variant="outlined"
                            className="bg-transparent border-light-gray"
                            size="sm"
                          >
                            <HiOutlineEllipsisHorizontal />
                          </Button>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem
                            className="text-dark"
                            onClick={handleEditDetails}
                          >
                            Edit Details
                          </MenuItem>
                          <MenuItem
                            className="text-dark"
                            onClick={loadingHandlerDialog}
                          >
                            Sync and Generate
                          </MenuItem>
                          <hr className="my-1 text-light-gray" />
                          <MenuItem onClick={deleteHandlerDialog}>
                            <span className="text-red-400">Delete</span>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 h-full">
                <div className="flex flex-col gap-5">
                  <ReviewComponent
                    title="Basic Information"
                    data={[
                      {
                        name: "Recipient's Company",
                        value: quote.form_data.recipient_company,
                      },
                      {
                        name: "Recipient's Address",
                        value: quote.form_data.recipient_address,
                      },
                      {
                        name: "Recipient's Name",
                        value: quote.form_data.recipient_name,
                      },
                      {
                        name: "Recipient's Email",
                        value: quote.form_data.recipient_email,
                      },
                      {
                        name: "Currency",
                        value: quote.form_data.currency,
                      },
                      {
                        name: "Billing Account",
                        value: quote.form_data.billing_account,
                      },
                      {
                        name: "Due Date",
                        value: quote.form_data.due_date,
                      },
                    ]}
                  />
                  <div className="w-full pb-10 flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center w-full">
                      <Typography variant="small" className="font-semibold">
                        Scope of Work
                      </Typography>
                    </div>
                    <hr className="border-light-gray" />
                    <div className=" flex flex-col gap-3">
                      {quote.form_data.scope_of_work.length == 0 ? (
                        <>
                          <div className="py-5 text-center justify-center items-center flex flex-col">
                            <HiMiniExclamationCircle
                              className="text-orange-500"
                              size={25}
                            />

                            <Typography
                              variant="small"
                              className="text-center text-[15px] font-medium"
                            >
                              No scope of work added.
                            </Typography>
                          </div>
                        </>
                      ) : (
                        <ul className="list-disc ml-5 flex-1">
                          {quote.form_data.scope_of_work.map((scope, index) => {
                            const isPHP = quote.currency == "PHP";
                            let service_fee = `${
                              isPHP
                                ? `PHP ${formatNumberWithCommaAndDecimal(
                                    scope.service_fee
                                  )} + 12% VAT`
                                : `${formatNumberWithCommaAndDecimal(
                                    scope.service_fee
                                  )} USD`
                            }`;

                            return (
                              <div key={`scope-${index}`} className="mt-3">
                                <li>
                                  <div className="flex flex-row justify-between">
                                    <div className="flex flex-col gap-1">
                                      <Typography
                                        variant="small"
                                        className="text-justify font-normal"
                                      >
                                        <span className="font-semibold">
                                          {scope.task}
                                        </span>{" "}
                                        <span>{scope.sub_task}</span>
                                      </Typography>
                                      <Typography
                                        variant="small"
                                        className="font-semibold"
                                      >
                                        Service Fee: {service_fee}
                                      </Typography>
                                      <Typography
                                        variant="small"
                                        className="font-semibold"
                                      >
                                        OOP Expenses: {scope.oop_expenses}
                                      </Typography>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogComponent
        dialogName={statusDialog}
        handlerDialog={statusHandlerDialog}
        title="Change Status"
        hideFooter={true}
        hideHeader={true}
      >
        <div className="p-5">
          <TimelineComponent
            timelines={[
              {
                title: "Pending Approval",
                date: new Date(),
                name: "Benjie Pecson",
                description:
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ex praesentium qui delectus reiciendis odio maiores, quam deserunt cupiditate distinctio soluta eaque aut quas dicta iure. Commodi enim necessitatibus unde?",
              },
              {
                title: "Pending Approval",
                date: new Date(),
                name: "Benjie Pecson",
                description:
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ex praesentium qui delectus reiciendis odio maiores, quam deserunt cupiditate distinctio soluta eaque aut quas dicta iure. Commodi enim necessitatibus unde?",
              },
              {
                title: "Pending Approval",
                date: new Date(),
                name: "Benjie Pecson",
                description:
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ex praesentium qui delectus reiciendis odio maiores, quam deserunt cupiditate distinctio soluta eaque aut quas dicta iure. Commodi enim necessitatibus unde?",
              },
            ]}
          ></TimelineComponent>
        </div>
      </DialogComponent>

      <DialogComponent
        dialogName={deleteDialog}
        handlerDialog={deleteHandlerDialog}
        title={`Delete ${quote.quote_name}`}
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={deleteHandlerDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              className="bg-secondary"
              onClick={() => {
                const filteredQuotes = quotes.filter(
                  (_) => _.quote_id !== quote.quote_id
                );
                setQuotes(filteredQuotes);
                toast.success("Quote deleted successfully.");
                navigate("/quotes");
              }}
            >
              Yes
            </ButtonComponent>
          </div>
        }
      >
        <Typography variant="small" className="font-normal text-sm">
          Are you sure? This action cannot be undone.
        </Typography>
      </DialogComponent>

      <dialog
        open={loadingDialog}
        onClick={loadingHandlerDialog}
        className="w-full bg-black/70 z-20 h-screen absolute top-0"
      >
        <div className="flex flex-row justify-center items-center h-full">
          <Spinner color="teal" className="text-white w-8 h-8"></Spinner>
        </div>
      </dialog>
    </div>
  );
};

export default ViewQuotePage;
