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
import useGISDocumentStore from "../../../../store/useGISDocumentStore";

const AddDocumentDraftingPage = () => {
  const { entity_id } = useParams();

  const { states } = useDocumentDraftingStore();

  const { entity } = useLegalEntities();

  const { GISDocument } = useGISDocumentStore();

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

  const noOfStockholders = [
    {
      number: "One",
      iar_no_of_stockholders: "one",
      iar_no_of_stockholders_int: "1",
    },
    {
      number: "Two",
      iar_no_of_stockholders: "two",
      iar_no_of_stockholders_int: "2",
    },
    {
      number: "Three",
      iar_no_of_stockholders: "three",
      iar_no_of_stockholders_int: "3",
    },
    {
      number: "Four",
      iar_no_of_stockholders: "four",
      iar_no_of_stockholders_int: "4",
    },
    {
      number: "Five",
      iar_no_of_stockholders: "five",
      iar_no_of_stockholders_int: "5",
    },
    {
      number: "Six",
      iar_no_of_stockholders: "six",
      iar_no_of_stockholders_int: "6",
    },
    {
      number: "Seven",
      iar_no_of_stockholders: "seven",
      iar_no_of_stockholders_int: "7",
    },
    {
      number: "Eight",
      iar_no_of_stockholders: "eight",
      iar_no_of_stockholders_int: "8",
    },
    {
      number: "Nine",
      iar_no_of_stockholders: "nine",
      iar_no_of_stockholders_int: "9",
    },
    {
      number: "Ten",
      iar_no_of_stockholders: "ten",
      iar_no_of_stockholders_int: "10",
    },
    {
      number: "Eleven",
      iar_no_of_stockholders: "eleven",
      iar_no_of_stockholders_int: "11",
    },
    {
      number: "Twelve",
      iar_no_of_stockholders: "twelve",
      iar_no_of_stockholders_int: "12",
    },
    {
      number: "Thirteen",
      iar_no_of_stockholders: "thirteen",
      iar_no_of_stockholders_int: "13",
    },
    {
      number: "Fourteen",
      iar_no_of_stockholders: "fourteen",
      iar_no_of_stockholders_int: "14",
    },
    {
      number: "Fifteen",
      iar_no_of_stockholders: "fifteen",
      iar_no_of_stockholders_int: "15",
    },
    {
      number: "Sixteen",
      iar_no_of_stockholders: "sixteen",
      iar_no_of_stockholders_int: "16",
    },
    {
      number: "Seventeen",
      iar_no_of_stockholders: "seventeen",
      iar_no_of_stockholders_int: "17",
    },
    {
      number: "Eighteen",
      iar_no_of_stockholders: "eighteen",
      iar_no_of_stockholders_int: "18",
    },
    {
      number: "Nineteen",
      iar_no_of_stockholders: "nineteen",
      iar_no_of_stockholders_int: "19",
    },
    {
      number: "Twenty",
      iar_no_of_stockholders: "twenty",
      iar_no_of_stockholders_int: "20",
    },
    {
      number: "Twenty-One",
      iar_no_of_stockholders: "twenty-one",
      iar_no_of_stockholders_int: "21",
    },
    {
      number: "Twenty-Two",
      iar_no_of_stockholders: "twenty-two",
      iar_no_of_stockholders_int: "22",
    },
    {
      number: "Twenty-Three",
      iar_no_of_stockholders: "twenty-three",
      iar_no_of_stockholders_int: "23",
    },
    {
      number: "Twenty-Four",
      iar_no_of_stockholders: "twenty-four",
      iar_no_of_stockholders_int: "24",
    },
    {
      number: "Twenty-Five",
      iar_no_of_stockholders: "twenty-five",
      iar_no_of_stockholders_int: "25",
    },
  ];

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

      //for cover sheet
      new_form_data.department = "CRMD";
      new_form_data.secondary_license = "N/A";
      new_form_data.official_email_address =
        entity.entity_details.official_email;
      new_form_data.contact_person_email = entity.entity_details.official_email;

      //for cover sheet - company info
      new_form_data.telephone_number =
        entity.entity_details.official_contact_number;
      new_form_data.official_mobile_number =
        entity.entity_details.official_contact_number;

      if (entity.entity_details.officer_information.length != 0) {
        let officer = entity.entity_details.officer_information[0];
        new_form_data.officer_name = officer.officer_name;
        new_form_data.officer_position = officer.officer;
        new_form_data.officer_nationality = officer.nationality;
        setSelectedOfficer(officer.officer_name);
      }

      let officers = entity.entity_details.officer_information.filter(
        (officer) => {
          if (officer.officer.includes("secretary").toString().toLowerCase()) {
            new_form_data.corp_sec = officer.officer_name;
            new_form_data.corp_sec_address = officer.current_residence;
          }
          //for smr officers
          if (officer.officer.includes("president").toString().toLowerCase()) {
            new_form_data.president_name = officer.officer_name;
          }
          if (officer.officer.includes("treasurer").toString().toLowerCase()) {
            new_form_data.treasurer_name = officer.officer_name;
          }
          return officer.officer != "N/A";
        }
      );

      //for Waiver of Notice and Notice of Meeting
      if (entity.latest_GIS.length != 0) {
        let stockholders_name =
          entity.latest_GIS[0].document_data.stock_holders_information.information.map(
            (stockholder) => ({
              name: stockholder.name,
              position: "Stockholder",
            })
          );

        let mapped_stockholders_name = stockholders_name.map((stockholder) => ({
          name: stockholder.name,
          position: "Stockholder",
        }));

        new_form_data.stockholders = mapped_stockholders_name;

        //for Waiver of Notice - Corporate Secretary
        let corp_sec_name =
          entity.latest_GIS[0].document_data.corporate_secretary;
        new_form_data.nom_corpsec_name = corp_sec_name;
      } else {
        new_form_data.stockholders = [];
      }

      //for Independent Auditor's Report - Stockholders that has 100 or more shares
      if (entity.latest_GIS.length != 0) {
        let stockholders_amount =
          entity.latest_GIS[0].document_data.stock_holders_information.information.filter(
            (stockholder) => stockholder.amount >= 100
          ).length;
      
        if (stockholders_amount) {
          const matchedStockholder = noOfStockholders.find(
            (stockholder) => stockholder.iar_no_of_stockholders_int === stockholders_amount.toString()
          );
      
          if (matchedStockholder) {
            new_form_data.iar_no_of_stockholders = matchedStockholder.iar_no_of_stockholders;
            new_form_data.iar_no_of_stockholders_int = matchedStockholder.iar_no_of_stockholders_int;
          }
        }
      }

      setOfficers(officers);
      setFormData(new_form_data);
    }
  };

  useEffect(() => {
    formDefault();
    //console.log("Anthony Add Data Entity: ", entity);
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
