import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import useQuoteStore from "../../../../store/useQuoteStore";
import { useDirtyContext } from "../../../../providers/DirtyProvider";
import UpdatePageComponent from "../../../../components/UpdatePageComponent";
import { GetFormComponent } from "../../../quotes/GetFormComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import axiosInstance from "../../../../utils/axiosHelper";
import useLegalEntities from "../../../../store/useLegalEntities";
import useGISDocumentStore from "../../../../store/useGISDocumentStore";
import { GeneralInformationForm } from "./form_data/GeneralInformationForm";
import { CapitalStructureForm } from "./form_data/CapitalStructureForm";
import { BeneficialOwnershipForm } from "./form_data/BeneficialOwnershipForm";
import { ReviewForm } from "./form_data/ReviewForm";
import { HiExclamationCircle } from "react-icons/hi2";

const UpdateGISPage = () => {
  const { entity_id, gis_document_id } = useParams();
  const navigate = useNavigate();

  const { entity } = useLegalEntities();

  const { states, GISDocument, setGISDocument } = useGISDocumentStore();

  const PATH = `/legal-entities/v/${entity_id}`;

  const { setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(GISDocument.document_data);

  const [errors, setErrors] = useState({});

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = (e) => {
    setSubmitDialog(!submitDialog);
  };

  const [pageIsLoading, setPageIsLoading] = useState(false);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleSubmit = async (e, status = "Pending for Approval") => {
    try {
      setIsFormSubmitting(true);

      const payload = {
        document_data: formData,
        timestamp: {
          status: status,
          remarks: "",
        },
      };

      const response = await axiosInstance.patch(
        `/legal-entities/${entity_id}/gis-tracker/${gis_document_id}`,
        payload
      );
      if (response.status == 200) {
        toast.success("Record has been successfully updated!");
        navigate(`${PATH}/gis-tracker/view/${gis_document_id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error in adding the record.");
    } finally {
      handleSubmitDialog();
      setIsFormSubmitting(false);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     setIsFormSubmitting(true);

  //     console.log(formData);

  //     return;

  //     const updateData = {
  //       quote: { ...quote, form_data: { ...formData } },
  //       timestamp: { status: "Drafted", remarks: "" },
  //     };

  //     const response = await axiosInstance.patch(
  //       `/quote/${quote_id}`,
  //       updateData
  //     );

  //     if (response.status == 200) {
  //       navigate("/quotes/view/" + quote_id);
  //       toast.success("Quote updated successfully.");
  //     } else {
  //       throw Error("Failed to update the record.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to update the record.");
  //   } finally {
  //     setIsFormSubmitting(false);
  //     handleSubmitDialog();
  //   }
  // };

  const setToDefault = async () => {
    let form_data = { ...states.GISDocument.document_data };
    // Loop through each key and set its value to an empty string
    for (let key in form_data) {
      if (form_data.hasOwnProperty(key)) {
        form_data[key] = "";
      }
    }
    setErrors(form_data);
    setPageIsLoading(false);
  };

  const getFormState = (title, form_contents) => {
    const formState = {
      title: "",
      form_contents: <></>,
    };

    return {
      ...formState,
      title,
      form_contents,
    };
  };

  const WarningMessage = () => {
    if (
      GISDocument.timestamps.length == 0 ||
      GISDocument.timestamps[0].status != "Reverted" ||
      GISDocument.timestamps[0].remarks == ""
    )
      return <></>;

    return (
      <div className="flex flex-col w-full bg-orange-200 px-5 py-2 rounded-xl mb-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-8">
            <div className="flex flex-col items-center justify-center">
              <HiExclamationCircle className="text-orange-900" size={25} />
            </div>
            <div className="flex flex-row items-center justify-center">
              <Typography variant="small" className="font-sm text-sm">
                {GISDocument.timestamps[0].remarks}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formComponent = [
    getFormState(
      "General Information",
      <GeneralInformationForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        WarningMessage={WarningMessage}
      />
    ),
    getFormState(
      "Capital Structure",
      <CapitalStructureForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        WarningMessage={WarningMessage}
      />
    ),
    getFormState(
      "Beneficial Ownership Declaration",
      <BeneficialOwnershipForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        WarningMessage={WarningMessage}
      />
    ),
    getFormState(
      "Review Information",
      <ReviewForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
    ),
  ];

  useEffect(() => {
    const fetchData = async () => {
      setPageIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/legal-entities/${entity_id}/gis-tracker/${gis_document_id}`
        );
        if (response.status == 200) {
          const { gis_document } = response.data;

          setFormData(gis_document.document_data);
          setGISDocument(gis_document);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setPageIsLoading(false);
      }
    };
    fetchData();
    setToDefault();
  }, []);

  return (
    <div>
      <UpdatePageComponent
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
            goto: `${PATH}/gis-tracker/view/${GISDocument.gis_document_id}`,
          },
          {
            title: "Update",
            goto: `${PATH}/gis-tracker/update/${GISDocument.gis_document_id}`,
          },
        ]}
        goBackTo={`${PATH}/gis-tracker`}
        title={"GIS"}
        handleSubmitDialog={handleSubmitDialog}
        formComponent={formComponent}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      ></UpdatePageComponent>

      <Dialog open={submitDialog} handler={handleSubmitDialog} size="sm">
        <DialogHeader>
          <Typography variant="small" className="font-bold text-base">
            Update GIS
          </Typography>
        </DialogHeader>
        <hr className="border-light-gray" />
        <DialogBody className="text-dark">
          <div className="flex flex-col gap-2">
            <Typography variant="small" className="font-normal text-sm">
              Are you sure you want to update this record?
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleSubmitDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              loading={isFormSubmitting}
              disabled={isFormSubmitting}
              className="bg-secondary"
              onClick={(e) => {
                handleSubmit(e, "Pending for Approval");
              }}
            >
              Yes
            </ButtonComponent>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default UpdateGISPage;
