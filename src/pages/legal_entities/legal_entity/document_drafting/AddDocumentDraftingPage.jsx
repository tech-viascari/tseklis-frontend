import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import AddPageComponent from "../../../../components/AddPageComponent";
import DialogComponent from "../../../../components/DialogComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useDirtyContext } from "../../../../providers/DirtyProvider";
import useLegalEntities from "../../../../store/useLegalEntities";
import useDocumentDraftingStore from "../../../../store/useDocumentDraftingStore";
import { DocumentTypeForm } from "./form_data/DocumentTypeForm";
import { DocumentDetailsForm } from "./form_data/DocumentDetailsForm";
import { DocumentReviewForm } from "./form_data/DocumentReviewForm";
import axiosInstance from "../../../../utils/axiosHelper";

const AddDocumentDraftingPage = () => {
  const { entity_id } = useParams();

  const { states } = useDocumentDraftingStore();

  const { entity } = useLegalEntities();

  const PATH = `/legal-entities/v/${entity_id}/document-drafting`;

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.DocumentState.document_data);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [officers, setOfficers] = useState([]);

  const [officer, setOfficer] = useState([]);

  const [errors, setErrors] = useState({});

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const handleSubmit = async () => {
    try {
      setIsFormSubmitting(true);

      const toInsert = {
        document_data: formData,
        attachments: {
          google_doc_id: "",
          final_doc: "",
        },
        timestamp: {
          status: "Drafted",
        },
      };

      const response = await axiosInstance.post(
        `/legal-entities/${entity_id}/document-drafting`,
        toInsert
      );

      if (response.status == 200) {
        toast.success("Record has been successfully added!");
        navigate(`${PATH}`);
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
    let form_data = { ...states.DocumentState.document_data };
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

  const formComponent = [
    getFormState(
      "Document Type",
      <DocumentTypeForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onChange={() => {}}
      />
    ),
    getFormState(
      "Document Details",
      <DocumentDetailsForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onChange={() => {}}
        officers={officers}
        setOfficers={setOfficers}
        selectedOfficer={selectedOfficer}
      />
    ),
    getFormState(
      "Review Information",
      <DocumentReviewForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onChange={() => {}}
        isPreview={false}
      />
    ),
  ];

  const formDefault = () => {
    if (entity.entity_id != "") {
      let new_form_data = { ...formData };

      new_form_data.corporate_name = entity.entity_details.company_name;
      new_form_data.corporate_tin = entity.entity_details.corporate_tin;
      new_form_data.office_address = entity.entity_details.company_address;
      new_form_data.sec_registration_number =
        entity.entity_details.sec_registration_number;

      // //for cover sheet
      // new_form_data.department = "CRMD";
      // new_form_data.secondary_license = "N/A";
      // new_form_data.official_email_address =
      //   selectedCompany.latestGIS.official_email_address;

      // //for cover sheet - company info
      // new_form_data.telephone_number =
      //   selectedCompany.latestGIS.telephone_number;
      // new_form_data.official_mobile_number =
      //   selectedCompany.latestGIS.official_mobile_number;
      // new_form_data.number_of_shareholders =
      //   selectedCompany.latestGIS.number_of_shareholders;
      // new_form_data.date_of_annual_meeting =
      //   selectedCompany.latestGIS.date_of_annual_meeting;
      // new_form_data.fiscal_year_end = selectedCompany.latestGIS.fiscal_year_end;

      if (entity.entity_details.officer_information.length != 0) {
        let officer = entity.entity_details.officer_information[0];
        new_form_data.officer_name = officer.officer_name;
        new_form_data.officer_position = officer.officer;
        new_form_data.officer_nationality = officer.nationality;
        setSelectedOfficer(officer.officer_name);
      }

      let officers = entity.entity_details.officer_information.filter(
        (officer) => {
          if (officer.officer.toLowerCase().includes("secretary")) {
            new_form_data.corp_sec = officer.officer_name;
            new_form_data.corp_sec_address = officer.current_residence;
          }
          // //for smr officers
          // if (officer.officer.toLowerCase().includes("president")) {
          //   new_form_data.president_name = officer.name;
          // }
          // if (officer.officer.toLowerCase().includes("treasurer")) {
          //   new_form_data.treasurer_name = officer.name;
          // }
          return officer.officer != "N/A";
        }
      );

      //stockholder information
      // const stockholder =
      //   selectedCompany.latestGIS.stock_holders_information.information.map(
      //     (stockholder) => {
      //       let setStockholder = {
      //         ...stockholderState,
      //         name: stockholder.name,
      //         nationality: stockholder.nationality,
      //         no_of_subscribed_shares: stockholder.number,
      //         amount_of_subscribed_shares: stockholder.amount,
      //         paidup_capital: stockholder.amount_paid,
      //         amount_of_paid_APIC: "-",
      //         total_amount_paid: stockholder.amount_paid,
      //       };
      //       return setStockholder;
      //     }
      //   );
      // new_form_data.stockholders_data = stockholder;
      setOfficers(officers);

      setFormData(new_form_data);
    }
  };

  useEffect(() => {
    formDefault();
  }, [entity]);

  return (
    <>
      <AddPageComponent
        items={[
          {
            title: entity.entity_details.company_name,
            goto: `/legal-entities/v/${entity_id}/`,
          },
          {
            title: "Document Drafting",
            goto: `${PATH}`,
          },
          {
            title: "Add New Document",
            goto: `${PATH}/add-new`,
          },
        ]}
        title="Add New Document"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo={`${PATH}`}
        formComponent={formComponent}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      />

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New Document"
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
              onClick={handleSubmit}
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

export default AddDocumentDraftingPage;
