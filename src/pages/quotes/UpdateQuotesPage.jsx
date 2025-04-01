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
import useQuoteStore from "../../store/useQuoteStore";
import UpdatePageComponent from "../../components/UpdatePageComponent";
import { useDirtyContext } from "../../providers/DirtyProvider";
import ButtonComponent from "../../components/ButtonComponent";
import axiosInstance from "../../utils/axiosHelper";
import { GetFormComponent } from "./GetFormComponent";
import { setDocumentTitle } from "../../utils/global";

const UpdateQuotesPage = () => {
  const { quote_id } = useParams();
  const navigate = useNavigate();
  const { states, quote, setQuote, quotes, setQuotes } = useQuoteStore();

  const { setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.quote.form_data);
  const [errors, setErrors] = useState({});

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = (e) => {
    setSubmitDialog(!submitDialog);
  };

  const [pageIsLoading, setPageIsLoading] = useState(false);

  const [scopeFormData, setScopeFormData] = useState(states.scope_of_work);
  const [scopeErrors, setScopeErrors] = useState(states.scope_of_work);

  const [scopeDialog, setScopeDialog] = useState(false);
  const [scopeIndex, setScopeIndex] = useState(-1);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsFormSubmitting(true);

      const updateData = {
        quote: { ...quote, form_data: { ...formData } },
        timestamp: { status: "Drafted", remarks: "" },
      };

      const response = await axiosInstance.patch(
        `/quote/${quote_id}`,
        updateData
      );

      if (response.status == 200) {
        navigate("/quotes/view/" + quote_id);
        toast.success("Quote updated successfully.");
      } else {
        throw Error("Failed to update the record.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update the record.");
    } finally {
      setIsFormSubmitting(false);
      handleSubmitDialog();
    }
  };

  const handleScopeDialog = (e, scope_of_work = states.scope_of_work) => {
    setScopeFormData(scope_of_work);
    setScopeDialog(!scopeDialog);
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

  const handleOnSelectChange = (name, value, error_message) => {
    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
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
    const fetchData = async () => {
      const response = await axiosInstance.get(`/quote/${quote_id}`);
      if (response.status == 200) {
        setFormData(response.data.quote.form_data);
        setQuote(response.data.quote);
      }
    };
    fetchData();
    setToDefault();
  }, []);

  setDocumentTitle(`${quote.quote_name} - Quotes`);

  return (
    <div>
      <UpdatePageComponent
        items={[
          { title: "Quotes", goto: "/quotes" },
          {
            title: `${quote.quote_name}`,
            goto: `/quotes/view/${quote.quote_id}`,
          },
          {
            title: "Update Quote",
            goto: `/quotes/update/${quote.quote_id}`,
          },
        ]}
        goBackTo={"/quotes"}
        title={"Quote"}
        handleSubmitDialog={handleSubmitDialog}
        formComponent={GetFormComponent({
          formData,
          handleOnSelectChange,
          setFormData,
          errors,
          setErrors,
          setIsDirty,
          scopeDialog,
          handleScopeDialog,
          scopeIndex,
          setScopeIndex,
          handleScopeAdd,
          handleScopeUpdate,
          handleScopeOnChange,
          scopeFormData,
          scopeErrors,
        })}
        pageIsLoading={pageIsLoading}
      ></UpdatePageComponent>

      <Dialog open={submitDialog} handler={handleSubmitDialog} size="sm">
        <DialogHeader>
          <Typography variant="small" className="font-bold text-base">
            Update Quote
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
              onClick={handleSubmit}
            >
              Yes
            </ButtonComponent>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default UpdateQuotesPage;
