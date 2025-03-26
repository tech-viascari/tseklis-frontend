import React, { useEffect, useState, UseState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
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
import LoadingComponent from "../../components/LoadingComponent";
import TextAreaComponent from "../../components/TextAreaComponent";

const ViewQuotePage = () => {
  const { quote_id } = useParams();

  const { quote, setQuote } = useQuoteStore();

  const [deleteDialog, setDeleteDialog] = useState(false);

  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [changeStatusDialog, setChangeStatusDialog] = useState(false);
  const changeStatusHandlerDialog = () => {
    setStatusDialog(true);
    setChangeStatusDialog(!changeStatusDialog);
  };

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

  const toggleChangeStatus = async () => {
    const formData = {
      quote,
      timestamp: {
        status,
        remarks,
      },
    };

    try {
      const response = await axiosInstance.patch(
        `/quote/${quote.quote_id}`,
        formData
      );
      if (response.status == 200) {
        toast.success("The record was updated successfully.");
        fetchData();
      }
    } catch (error) {
      toast.error("There was an error deleting the record");
    } finally {
      setChangeStatusDialog(false);
      setStatusDialog(true);
    }
  };

  const formattedTimeline = (timestamps = [], quote) => {
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

    const customClassName = `bg-transparent text-black border border-black hover:bg-black/80 hover:text-white hover:border-secondary font-sm focus:!border-black py-1`;

    const actionComponents = {
      Drafted: (
        <>
          <div className="flex flex-row gap-3">
            <ButtonComponent
              className={customClassName}
              onClick={() => {
                setRemarks("");
                setStatus("Sent for Signature");
                setChangeStatusDialog(true);
                setStatusDialog(false);
              }}
            >
              Mark as 'Sent for Signature'
            </ButtonComponent>
          </div>
        </>
      ),
      "Sent for Signature": (
        <div className="flex flex-row gap-3">
          <ButtonComponent
            className={customClassName}
            onClick={() => {
              setRemarks("");
              setStatus("Signed");
              setChangeStatusDialog(true);
              setStatusDialog(false);
            }}
          >
            Mark as 'Signed'
          </ButtonComponent>
        </div>
      ),
      Signed: (
        <div className="flex flex-row gap-3">
          <ButtonComponent
            className={customClassName}
            onClick={() => {
              setRemarks("");
              setStatus("Sent Invoice");
              setChangeStatusDialog(true);
              setStatusDialog(false);
            }}
          >
            Mark as 'Sent Invoice'
          </ButtonComponent>
        </div>
      ),
      "Sent Invoice": (
        <div className="flex flex-row gap-3">
          <ButtonComponent
            className={customClassName}
            onClick={() => {
              setRemarks("");
              setStatus("Paid");
              setChangeStatusDialog(true);
              setStatusDialog(false);
            }}
          >
            Mark as 'Paid'
          </ButtonComponent>
        </div>
      ),
      Paid: (
        <div className="flex flex-row gap-3">
          <ButtonComponent
            className={customClassName}
            onClick={() => {
              setRemarks("");
              setStatus("Completed");
              setChangeStatusDialog(true);
              setStatusDialog(false);
            }}
          >
            Mark as 'Completed'
          </ButtonComponent>
        </div>
      ),
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

  const handleSyncAndGenerate = async (e) => {
    try {
      setLoadingDialog(true);
      const response = await axiosInstance.get(`generate-quote`, {
        params: { quote_id },
      });

      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(response.data);
        newWindow.document.close(); // Ensure the document is rendered
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDialog(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/quote/${quote_id}`);
      if (response.status == 200) {
        const quotes = response.data.quote;

        const timeline = formattedTimeline(quotes.timestamps, quotes);

        setTimelines(timeline);
        setQuote(quotes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
                <MenuItem className="text-dark" onClick={handleSyncAndGenerate}>
                  Generate
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
                <span
                  className={`font-bold ${
                    !quote.form_data.subject && "bg-yellow-300"
                  }`}
                >
                  {quote.form_data.subject == ""
                    ? "<subject here>"
                    : quote.form_data.subject}
                </span>
              </Typography>
              <Typography variant="small" className="font-normal text-sm">
                Prepared by{" "}
                <span className="font-bold">
                  {quote.form_data.billing_account}
                </span>{" "}
                (the legal company representing{" "}
                <span className="font-bold">FullSuite Compliance</span>),
                outlines the services and associated costs for{" "}
                <span
                  className={`${!quote.form_data.scope && "bg-yellow-300"}`}
                >
                  {quote.form_data.scope == ""
                    ? "<scope here>"
                    : quote.form_data.scope}
                </span>{" "}
                with the specified government entities on behalf of{" "}
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
                    const isVATIncluded =
                      quote.form_data.include_vat == "Yes" ? " + 12% VAT" : "";
                    let service_fee = `${
                      isPHP
                        ? `PHP ${formatNumberWithCommaAndDecimal(
                            scope.service_fee
                          )} ${isVATIncluded}`
                        : `${formatNumberWithCommaAndDecimal(
                            scope.service_fee
                          )} USD ${isVATIncluded}`
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
              loading={isFormSubmitting}
              disabled={isFormSubmitting}
              className="bg-secondary"
              onClick={async () => {
                try {
                  setIsFormSubmitting(true);
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
                  setIsFormSubmitting(false);
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

      <DialogComponent
        dialogName={changeStatusDialog}
        handlerDialog={changeStatusHandlerDialog}
        title="Change Status"
        footerContent={
          <div className="flex flex-row items-center justify-center gap-5 w-full -mt-5 mb-2">
            <ButtonComponent
              className="bg-red-400"
              onClick={changeStatusHandlerDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              className="bg-secondary"
              onClick={() => {
                toggleChangeStatus();
              }}
            >
              Yes, proceed!
            </ButtonComponent>
          </div>
        }
        hideHeader={true}
      >
        <div className="flex flex-col gap-3 pt-5">
          <div className="flex flex-col items-center gap-2">
            <HiMiniExclamationCircle className="text-orange-500" size={50} />
            <Typography
              variant="small"
              className="font-bold text-md text-center"
            >
              Are you sure?
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-sm text-center"
            >
              You want to proceed to the next step?
            </Typography>
          </div>

          <TextAreaComponent
            label={"Remarks"}
            error_message=""
            name="remarks"
            value={remarks}
            onChange={(e) => {
              setRemarks(e.target.value);
            }}
            labelClass=""
          />
        </div>
      </DialogComponent>

      <LoadingComponent
        open={loadingDialog}
        loadingHandlerDialog={loadingHandlerDialog}
      />
    </>
  );
};

export default ViewQuotePage;
