import React, { useEffect, useState, UseState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {
  HiMiniExclamationCircle,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import { toast } from "sonner";
import useQuoteStore from "../../store/useQuoteStore";
import ViewPageComponent from "../../components/ViewPageComponent";
import ReviewComponent from "../../components/ReviewComponent";
import DialogComponent from "../../components/DialogComponent";
import ButtonComponent from "../../components/ButtonComponent";
import axiosInstance from "../../utils/axiosHelper";
import {
  formattedDate,
  formatNumberWithCommaAndDecimal,
} from "../../utils/global";
import TimelineComponent from "../../components/TimelineComponent";

const ViewQuotePage = () => {
  const { quote_id } = useParams();

  const { quote, setQuote } = useQuoteStore();

  const [deleteDialog, setDeleteDialog] = useState(false);

  const deleteHandlerDialog = () => {
    setDeleteDialog(!deleteDialog);
  };

  const [loadingDialog, setLoadingDialog] = useState(false);
  const loadingHandlerDialog = () => {
    setLoadingDialog(!loadingDialog);
  };

  const [statusDialog, setStatusDialog] = useState(false);
  const statusHandlerDialog = () => {
    setStatusDialog(!statusDialog);
  };

  const [timelines, setTimelines] = useState([]);

  const navigate = useNavigate();

  const formattedTimeline = (timestamps = []) => {
    if (timestamps.length === 0) {
      return [];
    }

    const timelineState = {
      title: "",
      date: new Date(),
      name: "",
      description: "",
      action_component: <></>,
    };

    const actionComponents = {
      Drafted: (
        <>
          <div className="flex flex-row gap-3">
            <ButtonComponent className="bg-transparent text-gray border hover:bg-primary hover:text-white font-sm">
              Mark as 'Rejected'
            </ButtonComponent>
          </div>
        </>
      ),
      "For Approval": <>For Approval</>,
    };

    const timeline = timestamps.map((timestamp, index) => {
      const actionComponent =
        actionComponents[timestamp.status] && index == 0 ? (
          actionComponents[timestamp.status]
        ) : (
          <></>
        );
      return {
        ...timelineState,
        title: timestamp.status,
        date: timestamp.datetime,
        name: timestamp.full_name,
        description: timestamp.remarks,
        action_component: actionComponent,
      };
    });

    return timeline;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/quote/${quote_id}`);
        if (response.status == 200) {
          const quotes = response.data.quote;

          const timeline = formattedTimeline(quotes.timestamps);

          setTimelines(timeline);
          setQuote(quotes);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ViewPageComponent
        items={[
          { title: "Quotes", goto: "/quotes" },
          {
            title: quote.quote_name,
            goto: `/quote/view/${quote_id}`,
          },
        ]}
        title={quote.quote_name}
        subtitle={quote.quote_number}
        sideButtonComponent={
          <div className="flex w-max flex-row gap-2">
            <ButtonComponent
              variant="outlined"
              className="py-1 px-4 text-secondary text-sm"
              onClick={statusHandlerDialog}
            >
              {quote.timestamps.length != 0 && quote.timestamps[0].status}
            </ButtonComponent>
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
                  onClick={() => {
                    setQuote(quote);
                    navigate(`/quotes/update/${quote_id}`);
                  }}
                >
                  Edit Details
                </MenuItem>
                <MenuItem className="text-dark" onClick={loadingHandlerDialog}>
                  Sync and Generate
                </MenuItem>
                <hr className="my-1 text-light-gray" />
                <MenuItem onClick={deleteHandlerDialog}>
                  <span className="text-red-400">Delete</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        }
      >
        <div className="flex flex-col gap-3 mb-10">
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
                value: formattedDate(quote.form_data.due_date),
              },
            ]}
          />

          <div className="flex flex-col gap-1">
            <Typography variant="small" className="font-semibold text-sm">
              Scope of Work
            </Typography>
            <hr className="border-light-gray" />
            <div className="flex flex-col gap-3 mt-3">
              <Typography variant="small" className="font-normal text-sm">
                <span className="font-bold">RE:</span> Service Quote for{" "}
                <span className="font-bold">
                  {quote.form_data.service_type}
                </span>
                .
              </Typography>
              <Typography variant="small" className="font-normal text-sm">
                Prepared by{" "}
                <span className="font-bold">
                  {quote.form_data.billing_account}
                </span>{" "}
                (the legal company representing{" "}
                <span className="font-bold">FullSuite Compliance</span>),
                outlines the services and associated costs for undertaking the
                audit fieldwork coordination with the specified government
                entities on behalf of{" "}
                <span className="font-bold">
                  {quote.form_data.recipient_company}
                </span>{" "}
                (herein referred to as “ Client”),
              </Typography>
              <Typography variant="small" className="font-normal text-sm">
                FullSuite will carry out, under Partner Client's direction and
                approval, the scope of work as follows:
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
              {quote.form_data.scope_of_work.length == 0 ? (
                <>
                  <div className="py-5 text-center justify-center items-center flex flex-col">
                    <HiMiniExclamationCircle
                      className="text-orange-500"
                      size={25}
                    />

                    <Typography
                      variant="small"
                      className="text-center text-sm font-medium"
                    >
                      No scope of work added yet.
                    </Typography>
                  </div>
                </>
              ) : (
                <ul className="list-disc ml-5 flex-1 mt-1 gap-1 flex flex-col">
                  {quote.form_data.scope_of_work.map((scope, index) => {
                    const isPHP = quote.form_data.currency == "PHP";
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
                      <div key={`scope-${index}`}>
                        <li>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-1">
                              <Typography
                                variant="small"
                                className="text-justify text-sm font-normal"
                              >
                                <span className="font-semibold text-sm">
                                  {scope.task}
                                </span>{" "}
                                <span className="text-sm">
                                  {scope.sub_task}
                                </span>
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
      </ViewPageComponent>

      <DialogComponent
        dialogName={statusDialog}
        handlerDialog={statusHandlerDialog}
        title="Change Status"
        hideFooter={true}
        hideHeader={true}
        size="md"
      >
        <div className="p-5">
          <TimelineComponent timelines={timelines}></TimelineComponent>
        </div>
      </DialogComponent>

      <DialogComponent
        dialogName={deleteDialog}
        handlerDialog={deleteHandlerDialog}
        title={`Delete Quote`}
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
              onClick={async () => {
                try {
                  const response = await axiosInstance.delete(
                    `/quote/${quote.quote_id}`
                  );
                  if (response.status == 200) {
                    toast.success("The record was deleted successfully.");
                    navigate("/quotes");
                  }
                } catch (error) {
                  console.log(error);
                  toast.error("There was an error deleting the record");
                } finally {
                  deleteHandlerDialog();
                }
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
    </>
  );
};

export default ViewQuotePage;
