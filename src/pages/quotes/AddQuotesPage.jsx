import React, { useEffect, useState } from "react";
import MainContent from "../layouts/MainContent";
import ButtonComponent from "../../components/ButtonComponent";
import {
  HiArrowSmallLeft,
  HiArrowSmallRight,
  HiMiniExclamationCircle,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import { useDirtyContext } from "../../providers/DirtyProvider";
import { useNavigate } from "react-router";
import InputComponent from "../../components/InputComponent";
import useQuoteStore from "../../store/useQuoteStore";
import SelectComponent from "../../components/SelectComponent";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Spinner,
  DialogHeader,
} from "@material-tailwind/react";
import TextAreaComponent from "../../components/TextAreaComponent";
import {
  formatNumberWithCommaAndDecimal,
  formattedDate,
} from "../../utils/global";
import { toast } from "sonner";
import FormComponent from "./FormComponent";
import ReviewComponent from "../../components/ReviewComponent";

const AddQuotesPage = () => {
  const { isDirty, setIsDirty } = useDirtyContext();

  const { states } = useQuoteStore();

  const [formData, setFormData] = useState(states.quote_form_data);
  const [scopeFormData, setScopeFormData] = useState(states.scope_of_work);

  const [errors, setErrors] = useState({});
  const [scopeErrors, setScopeErrors] = useState(states.scope_of_work);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [scopeDialog, setScopeDialog] = useState(false);
  const [submitDialog, setSubmitDialog] = useState(false);

  const [scopeIndex, setScopeIndex] = useState(-1);

  const navigate = useNavigate();

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

  const handleScopeDialog = (e, scope_of_work = states.scope_of_work) => {
    setScopeFormData(scope_of_work);
    setScopeDialog(!scopeDialog);
  };

  const handleSubmitDialog = (e) => {
    setSubmitDialog(!submitDialog);
  };

  const handleSubmit = () => {
    try {
      toast.success("Quote added successfully.");
      navigate("/quotes");
    } catch (error) {
      console.log(error);
    } finally {
      handleSubmitDialog();
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

  const formComponent = [
    getFormState(
      "Basic Information",
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
          <InputComponent
            label="Recipient's Company"
            required={true}
            name="recipient_company"
            value={formData.recipient_company}
            error_message={errors.recipient_company}
            onChange={(e) => {
              handleOnChange(e, "Recipient's Company is required.");
            }}
          />
          <InputComponent
            label="Recipient's Name"
            required={true}
            name="recipient_name"
            value={formData.recipient_name}
            error_message={errors.recipient_name}
            onChange={(e) => {
              handleOnChange(e, "Recipient's Name is required.");
            }}
          />
          <InputComponent
            label="Recipient's Email Address"
            required={true}
            name="recipient_email"
            value={formData.recipient_email}
            error_message={errors.recipient_email}
            onChange={(e) => {
              handleOnChange(e, "Recipient's Email Address is required.");
            }}
          />
          <InputComponent
            label="Recipient's Address"
            required={true}
            name="recipient_address"
            value={formData.recipient_address}
            error_message={errors.recipient_address}
            onChange={(e) => {
              handleOnChange(e, "Recipient's Address is required.");
            }}
          />
          <SelectComponent
            label="Currency"
            name="currency"
            value={formData.currency}
            error_message={errors.currency}
            onSelectChange={(value) => {
              handleOnSelectChange("currency", value, "Currency is required.");
            }}
            required={true}
            options={[
              { name: "USD", value: "USD" },
              { name: "PHP", value: "PHP" },
            ]}
          />

          <SelectComponent
            label="Billing Account"
            name="billing_account"
            value={formData.billing_account}
            error_message={errors.billing_account}
            onSelectChange={(value) => {
              handleOnSelectChange(
                "billing_account",
                value,
                "Billing Account is required."
              );
            }}
            required={true}
            options={[
              { name: "Viascari, Inc.", value: "Viascari, Inc." },
              {
                name: "Offshore Concept BPO Services, Inc.",
                value: "Offshore Concept BPO Services, Inc.",
              },
            ]}
          />

          <InputComponent
            label="Due Date"
            required={true}
            name="due_date"
            type="date"
            value={formData.due_date}
            error_message={errors.due_date}
            onChange={(e) => {
              handleOnChange(e, "Due Date is required.");
            }}
          />
        </div>
      </>
    ),
    getFormState(
      "Scope of Work",
      <>
        <div className="w-full pb-10">
          <div className="flex flex-row justify-between items-center w-full">
            <Typography variant="small" className="font-semibold">
              Scope of Work: <span className="text-red-500">*</span>
            </Typography>
            <ButtonComponent
              className="bg-secondary text-light"
              onClick={handleScopeDialog}
            >
              Add scope
            </ButtonComponent>
            <Dialog open={scopeDialog} handler={handleScopeDialog}>
              <DialogBody className="text-dark">
                <div className="flex flex-col w-full px-5 pt-3">
                  <Typography variant="small" className="font-bold text-md">
                    Add Scope of Work
                  </Typography>
                  <div className="flex flex-col mt-5 gap-2">
                    <InputComponent
                      label="Scope of work"
                      required={true}
                      name="task"
                      value={scopeFormData.task}
                      error_message={scopeErrors.task}
                      onChange={(e) => {
                        handleScopeOnChange(e, "Scope of Work is required.");
                      }}
                    />
                    <TextAreaComponent
                      label="Description"
                      required={true}
                      name="sub_task"
                      value={scopeFormData.sub_task}
                      error_message={scopeErrors.sub_task}
                      onChange={(e) => {
                        handleScopeOnChange(e, "Description is required.");
                      }}
                    />
                    <InputComponent
                      label="Service Fee"
                      type="number"
                      required={true}
                      name="service_fee"
                      value={scopeFormData.service_fee}
                      error_message={scopeErrors.service_fee}
                      onChange={(e) => {
                        handleScopeOnChange(e, "Service Fee is required.");
                      }}
                    />
                    <InputComponent
                      label="Out-of-pocket Expenses"
                      required={true}
                      name="oop_expenses"
                      value={scopeFormData.oop_expenses}
                      error_message={scopeErrors.oop_expenses}
                      onChange={(e) => {
                        handleScopeOnChange(
                          e,
                          "Out-of-pocket Expenses is required."
                        );
                      }}
                    />
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <div className="flex flex-row gap-3 px-5 pb-3">
                  <ButtonComponent
                    variant="outlined"
                    className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                    onClick={handleScopeDialog}
                  >
                    Cancel
                  </ButtonComponent>

                  {scopeIndex != -1 ? (
                    <ButtonComponent
                      className="bg-secondary"
                      onClick={handleScopeUpdate}
                    >
                      Update scope
                    </ButtonComponent>
                  ) : (
                    <ButtonComponent
                      className="bg-secondary"
                      onClick={handleScopeAdd}
                    >
                      Add scope
                    </ButtonComponent>
                  )}
                </div>
              </DialogFooter>
            </Dialog>
          </div>
          <div className=" flex flex-col gap-3">
            {formData.scope_of_work.length == 0 ? (
              <>
                <div className="py-5 text-center justify-center items-center flex flex-col">
                  <HiMiniExclamationCircle
                    className="text-orange-500"
                    size={25}
                  />

                  <Typography
                    variant="small"
                    className="text-center text-[15px] font-medium"
                  >
                    No scope of work added yet.
                  </Typography>

                  <Typography
                    variant="small"
                    className="font-normal text-center text-[12px]"
                  >
                    Click the add button above to add a new scope of work.
                  </Typography>
                </div>
              </>
            ) : (
              <ul className="list-disc ml-5 flex-1">
                {formData.scope_of_work.map((scope, index) => {
                  const isPHP = formData.currency == "PHP";
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
                    <div key={`scope-${index}`} className="mt-3">
                      <li>
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col gap-1">
                            <Typography
                              variant="small"
                              className="text-justify font-normal"
                            >
                              <span className="font-semibold">
                                {scope.task}
                              </span>{" "}
                              <span>{scope.sub_task}</span>
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
                          <div className="flex flex-col px-5">
                            <Menu placement="bottom-end">
                              <MenuHandler>
                                <Button
                                  variant="filled"
                                  size="sm"
                                  className="bg-white shadow-none hover:shadow-md normal-case font-medium border-light-gray focus:!border-light-gray"
                                >
                                  <HiOutlineEllipsisHorizontal
                                    size={20}
                                    className="text-dark"
                                  />
                                </Button>
                              </MenuHandler>
                              <MenuList>
                                <MenuItem
                                  onClick={(e) => {
                                    handleScopeDialog(e, scope);
                                    setScopeIndex(index);
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  className="text-red-400"
                                  onClick={() => {
                                    let filteredScopeOfWork =
                                      formData.scope_of_work.filter(
                                        (_, _index) => _index != index
                                      );

                                    setFormData({
                                      ...formData,
                                      scope_of_work: filteredScopeOfWork,
                                    });
                                  }}
                                >
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
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
      </>
    ),
    getFormState(
      "Review Information",
      <>
        <div className="flex flex-col gap-5 pb-10">
          <div>
            <Typography variant="small" className="font-semibold text-md">
              Review Information
            </Typography>
            <Typography variant="small" className="font-normal text-sm">
              Kindly verify the details before submitting the record.
            </Typography>
          </div>

          <ReviewComponent
            title="Basic Information"
            data={[
              {
                name: "Recipient's Company",
                value: formData.recipient_company,
              },
              {
                name: "Recipient's Address",
                value: formData.recipient_address,
              },
              {
                name: "Recipient's Name",
                value: formData.recipient_name,
              },
              {
                name: "Recipient's Email",
                value: formData.recipient_email,
              },
              {
                name: "Currency",
                value: formData.currency,
              },
              {
                name: "Billing Account",
                value: formData.billing_account,
              },
              {
                name: "Due Date",
                value: formattedDate(formData.due_date),
              },
            ]}
          />

          <div className="flex flex-col gap-1">
            <Typography variant="small" className="font-semibold text-sm">
              Scope of Work
            </Typography>
            <hr className="border-light-gray" />
            <div className="flex flex-col gap-2">
              {formData.scope_of_work.length == 0 ? (
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
                  {formData.scope_of_work.map((scope, index) => {
                    const isPHP = formData.currency == "PHP";
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
      </>
    ),
  ];

  const handleOnChange = (e, error_message) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
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

  const handleBack = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      if (isDirty) {
        const alert = confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );

        if (alert) {
          setIsDirty(false);
          navigate("/quotes");
        }
      } else {
        navigate("/quotes");
      }
    }
  };

  const handleNext = () => {
    console.log(formData);
    if (selectedIndex < formComponent.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (selectedIndex == formComponent.length - 1) {
      handleSubmitDialog();
    }
  };

  const setToDefault = () => {
    let quote_form_data = { ...states.quote_form_data };
    // Loop through each key and set its value to an empty string
    for (let key in quote_form_data) {
      if (quote_form_data.hasOwnProperty(key)) {
        quote_form_data[key] = "";
      }
    }
    setErrors(quote_form_data);
    setPageIsLoading(false);
  };

  useEffect(() => {
    setToDefault();
  }, []);

  return (
    <MainContent
      items={[
        { title: "Quotes", goto: "/quotes" },
        { title: "Add New Quote", goto: "/quotes/add-new" },
      ]}
    >
      <div className="flex flex-col h-full">
        <h1 className="text-md font-semibold text-lg">Add New Quote</h1>
        <p className="text-sm font-normal">
          Please fill in the necessary details below.
        </p>

        <div className="flex flex-col h-full py-5 gap-3">
          <FormComponent
            formComponent={formComponent}
            selectedIndex={selectedIndex}
            pageIsLoading={pageIsLoading}
          />

          <div className="flex flex-row justify-between">
            <ButtonComponent
              variant="outlined"
              className="bg-transparent text-gray border-gray hover:text-red-400 hover:border-red-400 "
              onClick={handleBack}
            >
              <div className="flex flex-row gap-1 items-center">
                <HiArrowSmallLeft size={15} />
                {selectedIndex == 0 ? "Cancel" : "Back"}
              </div>
            </ButtonComponent>
            <ButtonComponent
              variant="outlined"
              className="bg-transparent text-gray border-gray hover:text-primary  hover:border-primary"
              onClick={handleNext}
            >
              <div className="flex flex-row gap-1 items-center">
                {selectedIndex == formComponent.length - 1 ? "Submit" : "Next"}
                <HiArrowSmallRight size={15} />
              </div>
            </ButtonComponent>
          </div>
        </div>
      </div>

      <Dialog open={submitDialog} handler={handleSubmitDialog} size="sm">
        <DialogHeader>
          <Typography variant="small" className="font-bold text-base">
            Add New Quote
          </Typography>
        </DialogHeader>
        <hr className="border-light-gray" />
        <DialogBody className="text-dark">
          <div className="flex flex-col gap-2">
            <Typography variant="small" className="font-normal text-sm">
              Are you sure you want to add this record?
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

            <ButtonComponent className="bg-secondary" onClick={handleSubmit}>
              Yes
            </ButtonComponent>
          </div>
        </DialogFooter>
      </Dialog>
    </MainContent>
  );
};

export default AddQuotesPage;
