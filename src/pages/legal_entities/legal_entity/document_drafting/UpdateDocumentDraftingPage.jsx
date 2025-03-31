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
import useLegalEntities from "../../../../store/useLegalEntities";
import useDocumentDraftingStore from "../../../../store/useDocumentDraftingStore";
import { useDirtyContext } from "../../../../providers/DirtyProvider";
import { DocumentTypeForm } from "./form_data/DocumentTypeForm";
import { DocumentDetailsForm } from "./form_data/DocumentDetailsForm";
import { DocumentReviewForm } from "./form_data/DocumentReviewForm";
import UpdatePageComponent from "../../../../components/UpdatePageComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import axiosInstance from "../../../../utils/axiosHelper";

const UpdateDocumentDraftingPage = () => {
  const { entity_id, document_id } = useParams();
  const navigate = useNavigate();

  const { entity } = useLegalEntities();

  const { states, document, setDocument } = useDocumentDraftingStore();

  const PATH = `/legal-entities/v/${entity_id}`;

  const { setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(document.document_data);
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");

  const [errors, setErrors] = useState({});

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = (e) => {
    setSubmitDialog(!submitDialog);
  };

  const [pageIsLoading, setPageIsLoading] = useState(false);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleSubmit = async (e, status = "Drafted") => {
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
        `/legal-entities/${entity_id}/document-drafting/${document_id}`,
        payload
      );
      if (response.status == 200) {
        toast.success("Record has been successfully updated!");
        navigate(`${PATH}/document-drafting/view/${document_id}`);
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
    let form_data = { ...document.document_data };
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
    const fetchData = async () => {
      setPageIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/legal-entities/${entity_id}/document-drafting/${document_id}`
        );
        if (response.status == 200) {
          const { document } = response.data;
          setFormData(document.document_data);
          setDocument(document);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setPageIsLoading(false);
      }
    };

    if (entity.entity_id != "") {
      formDefault();
      fetchData();
      setToDefault();
    }
  }, [entity]);

  return (
    <div>
      <UpdatePageComponent
        items={[
          {
            title: entity.entity_details.company_name,
            goto: PATH,
          },
          {
            title: "Document Drafting",
            goto: `${PATH}/document-drafting`,
          },
          {
            title: document.document_name,
            goto: `${PATH}/document-drafting/view/${document.document_id}`,
          },
          {
            title: "Update",
            goto: `${PATH}/document-drafting/update/${document.gis_document_id}`,
          },
        ]}
        goBackTo={`${PATH}/document-drafting`}
        title={"Document"}
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
                handleSubmit(e, "Drafted");
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

export default UpdateDocumentDraftingPage;
