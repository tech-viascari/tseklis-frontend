import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import AddPageComponent from "../../../../components/AddPageComponent";
import { GetFormComponent } from "../../../quotes/GetFormComponent";
import DialogComponent from "../../../../components/DialogComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import useQuoteStore from "../../../../store/useQuoteStore";
import { useDirtyContext } from "../../../../providers/DirtyProvider";
import useLegalEntities from "../../../../store/useLegalEntities";

const AddDocumentDraftingPage = () => {
  const { entity_id } = useParams();

  const { states, setQuotes, quotes } = useQuoteStore();

  const { entity } = useLegalEntities();

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.quote.form_data);

  const [errors, setErrors] = useState({});

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);
  const [scopeFormData, setScopeFormData] = useState(states.scope_of_work);
  const [scopeErrors, setScopeErrors] = useState(states.scope_of_work);

  const [scopeIndex, setScopeIndex] = useState(-1);

  const [scopeDialog, setScopeDialog] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const handleSubmit = async () => {
    try {
      const { quote_id, created_at, updated_at, ...filteredData } = formData;

      setIsFormSubmitting(true);
      // const response = await axiosInstance.post("/quotes", {
      //   form_data: filteredData,
      //   timestamp: {
      //     status: "Drafted",
      //     remarks: "",
      //   },
      // });
      // if (response.status == 200) {
        // toast.success("Quote has been successfully added!");
        navigate(`/legal-entities/v/${entity_id}/document-drafting`);
      // }
    } catch (error) {
      console.log(error);
      toast.error("There was an error in adding the record.");
    } finally {
      handleSubmitDialog();
      setIsFormSubmitting(false);
    }
  };

  const handleScopeOnChange = (e, error_message) => {
    const { name, value } = e.target;

    setScopeFormData({ ...scopeFormData, [name]: value });

    if (value === "") {
      setScopeErrors({ ...scopeErrors, [name]: error_message });
    } else {
      setScopeErrors({ ...scopeErrors, [name]: "" });
    }

    setIsDirty(true);
  };

  const handleScopeAdd = () => {
    let scope_of_work = formData.scope_of_work.map((scope) => {
      return scope;
    });
    scope_of_work.push(scopeFormData);
    setFormData({ ...formData, scope_of_work });
    setScopeDialog(false);
  };

  const handleScopeUpdate = () => {
    let newScopeOfWork = formData.scope_of_work.map((scope, index) => {
      if (index == scopeIndex) {
        return scopeFormData;
      }
      return scope;
    });

    setFormData({ ...formData, scope_of_work: newScopeOfWork });
    setScopeDialog(false);
    setScopeIndex(-1);
  };

  const handleOnSelectChange = (name, value, error_message) => {
    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleScopeDialog = (e, scope_of_work = states.scope_of_work) => {
    setScopeFormData(scope_of_work);
    setScopeDialog(!scopeDialog);
  };

  const setToDefault = async () => {
    let form_data = { ...states.quote.form_data };
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
    console.log(entity_id);
  }, []);

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
            goto: `/legal-entities/v/${entity_id}/document-drafting`,
          },
          {
            title: "Add New Document",
            goto: `/legal-entities/v/${entity_id}/document-drafting/add-new`,
          },
        ]}
        title="Add New Document"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo={`/legal-entities/v/${entity_id}/document-drafting`}
        formComponent={[{ title: "" }]}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      />

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New Quote"
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
