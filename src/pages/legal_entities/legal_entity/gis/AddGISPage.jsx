import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import AddPageComponent from "../../../../components/AddPageComponent";
import DialogComponent from "../../../../components/DialogComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useDirtyContext } from "../../../../providers/DirtyProvider";
import useLegalEntities from "../../../../store/useLegalEntities";
import useGISDocumentStore from "../../../../store/useGISDocumentStore";
import { GeneralInformationForm } from "./form_data/GeneralInformationForm";
import { CapitalStructureForm } from "./form_data/CapitalStructureForm";
import { BeneficialOwnershipForm } from "./form_data/BeneficialOwnershipForm";
import { ReviewForm } from "./form_data/ReviewForm";
import axiosInstance from "../../../../utils/axiosHelper";
import { ListOfIndividualsForm } from "./form_data/ListOfIndividualsForm";

const AddGISPage = () => {
  const { entity_id } = useParams();

  const PATH = `/legal-entities/v/${entity_id}`;

  const { states, document_state } = useGISDocumentStore();

  const { entity } = useLegalEntities();

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.GISDocument.document_data);

  const [errors, setErrors] = useState({});

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const handleSubmit = async (e, status = "Pending for Approval") => {
    try {
      setIsFormSubmitting(true);

      const payload = {
        document_data: formData,
        timestamp: {
          status: status,
          remarks: "",
        },
        attachments: states.GISAttachment,
      };

      const response = await axiosInstance.post(
        `/legal-entities/${entity_id}/gis-tracker`,
        payload
      );
      if (response.status == 200) {
        toast.success("Record has been successfully added!");
        navigate(`${PATH}/gis-tracker`);
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error in adding the record.");
    } finally {
      handleSubmitDialog();
      setIsFormSubmitting(false);
    }
  };

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

  useEffect(() => {
    if (entity.entity_id != "") {
      let newFormData = { ...formData };

      //company_name
      newFormData.corporate_name = entity.entity_details.company_name;

      //corporate_tin
      newFormData.corporate_tin = entity.entity_details.corporate_tin;

      //sec_registration_number
      newFormData.sec_registration_number =
        entity.entity_details.sec_registration_number;

      //company_address
      newFormData.complete_principal_office_address =
        entity.entity_details.company_address;

      //official_email
      newFormData.official_email_address = entity.entity_details.official_email;

      //alternative_email
      newFormData.alternate_email_address =
        entity.entity_details.alternative_email;

      //official_contact_number
      newFormData.official_mobile_number =
        entity.entity_details.official_contact_number;

      //alternative_contact_number
      newFormData.alternate_phone_number =
        entity.entity_details.alternative_contact_number;
      
      // //directors_officers
      // const directors = entity.entity_details.officer_information.map(
      //   (director) => {
      //     return {
      //       ...document_state.directorsOrOfficers,
      //       name: director.officer_name,
      //       current_residential_address: director.current_residence,
      //       nationality: director.nationality,
      //       incorporator: director.incorporator,
      //       board: director.board,
      //       gender: director.gender,
      //       stock_holder: director.stockholder,
      //       officer: director.officer,
      //       executive_committee: director.executive_committee,
      //       tax_id_number: director.tax_identification_number,
      //     };
      //   }
      // );

      // newFormData.directors_or_officers = directors;
      
      setFormData(newFormData);
    }
  }, [entity]);

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

  const formComponent = [
    getFormState(
      "General Information",
      <GeneralInformationForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
    ),
    getFormState(
      "Capital Structure",
      <CapitalStructureForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
    ),
    getFormState(
      "List of Individuals",
      <ListOfIndividualsForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
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

  return (
    <>
      <AddPageComponent
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
            title: "Add New GIS",
            goto: `${PATH}/gis-tracker/add-new`,
          },
        ]}
        title="Add New GIS"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo={`${PATH}/gis-tracker`}
        formComponent={formComponent}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      />

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New GIS"
        footerContent={
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
        }
      >
        <Typography variant="small" className="font-normal text-sm">
          Are you sure you want to add this record?
        </Typography>
      </DialogComponent>
    </>
  );
};

export default AddGISPage;
