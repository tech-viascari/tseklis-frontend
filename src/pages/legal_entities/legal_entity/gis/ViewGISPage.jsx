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
import useQuoteStore from "../../../../store/useQuoteStore";
import ViewPageComponent from "../../../../components/ViewPageComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import ReviewComponent from "../../../../components/ReviewComponent";
import { formattedDate } from "../../../../utils/global";
import DialogComponent from "../../../../components/DialogComponent";
import TimelineComponent from "../../../../components/TimelineComponent";
import TextAreaComponent from "../../../../components/TextAreaComponent";
import LoadingComponent from "../../../../components/LoadingComponent";
import axiosInstance from "../../../../utils/axiosHelper";
import useLegalEntities from "../../../../store/useLegalEntities";
import useGISDocumentStore from "../../../../store/useGISDocumentStore";
import { ReviewForm } from "./form_data/ReviewForm";

const ViewGISPage = () => {
  const { entity_id, gis_document_id } = useParams();

  const PATH = `/legal-entities/v/${entity_id}`;

  const { quote, setQuote } = useQuoteStore();

  const { entity } = useLegalEntities();

  const { GISDocument, setGISDocument } = useGISDocumentStore();

  const [deleteDialog, setDeleteDialog] = useState(false);

  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");

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
      GISDocument,
      timestamp: {
        status,
        remarks,
      },
    };

    try {
      const response = await axiosInstance.patch(
        `/GISDocument/${GISDocument.quote_id}`,
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
      const response = await axiosInstance.get(
        `/generate-quote/${gis_document_id}`
      );

      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(response.data);
        newWindow.document.close(); // Ensure the document is rendered
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDialog(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/legal-entities/${entity_id}/gis-tracker/${gis_document_id}`
      );
      if (response.status == 200) {
        const { gis_document } = response.data;

        const timeline = formattedTimeline(gis_document.timestamps);

        setTimelines(timeline);

        setGISDocument(gis_document);
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
          {
            title: entity.entity_details.company_name,
            goto: PATH,
          },
          {
            title: "GIS Tracker",
            goto: `${PATH}/gis-tracker`,
          },
          {
            title: GISDocument.gis_document_name,
            goto: `${PATH}/gis-tracker/${GISDocument.gis_document_id}`,
          },
        ]}
        title={GISDocument.gis_document_name}
        subtitle={GISDocument.quote_number}
        sideButtonComponent={
          <div className="flex w-max flex-row gap-2">
            <ButtonComponent
              variant="outlined"
              className="py-1 px-4 text-secondary text-sm"
              onClick={statusHandlerDialog}
            >
              {GISDocument.timestamps.length != 0 &&
                GISDocument.timestamps[0].status}
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
                    setQuote(GISDocument);
                    navigate(`/quotes/update/${quote_id}`);
                  }}
                >
                  Edit Details
                </MenuItem>
                <MenuItem className="text-dark" onClick={handleSyncAndGenerate}>
                  Generate
                </MenuItem>

                <MenuItem onClick={deleteHandlerDialog}>
                  <div className="text-red-400">Delete</div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        }
      >
        <div className="flex flex-col gap-3 mb-10">
          <ReviewForm formData={GISDocument.document_data} isPreview={true} />
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
        title={`Delete ${GISDocument.gis_document_name}`}
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
                    `/legal-entities/${entity_id}/gis-tracker/${gis_document_id}`
                  );
                  if (response.status == 200) {
                    toast.success("The record was deleted successfully.");
                    navigate(`${PATH}/gis-tracker`);
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

export default ViewGISPage;
