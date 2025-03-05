import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Switch,
  Typography,
} from "@material-tailwind/react";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import { handleOnChange } from "../../utils/global";
import ButtonComponent from "../../components/ButtonComponent";
import {
  formatNumberWithCommaAndDecimal,
  formattedDate,
} from "../../utils/global";
import DialogComponent from "../../components/DialogComponent";
import TextAreaComponent from "../../components/TextAreaComponent";
import {
  HiMiniExclamationCircle,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import ReviewComponent from "../../components/ReviewComponent";

export const GetFormComponent = ({
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
}) => {
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

          <div className="flex flex-col gap-1">
            <Typography variant="small" className={`mb-1 font-normal`}>
              Include 12% VAT <span className="text-red-400">*</span>
            </Typography>
            <div className="flex flex-row items-center h-10 gap-3">
              <Switch
                name="include_vat"
                checked={formData.include_vat == "Yes"}
                className="checked:bg-primary"
                onChange={(e) => {
                  const { checked } = e.target;
                  setFormData({
                    ...formData,
                    include_vat: checked ? "Yes" : "No",
                  });
                }}
              />
              <Typography variant="small" className="font-normal text-sm">
                {formData.include_vat}
              </Typography>
            </div>
            {errors.active && (
              <label className="text-xs text-red-500 flex flex-row gap-1 items-center">
                <HiMiniExclamationTriangle size={15} />
                {errors.active}
              </label>
            )}
          </div>
        </div>
      </>
    ),
    getFormState(
      "Scope of Work",
      <>
        <div className="flex flex-col w-full pb-10 gap-3">
          <InputComponent
            label="Subject"
            required={true}
            name="subject"
            value={formData.subject}
            error_message={errors.subject}
            onChange={(e) => {
              handleOnChange(e, "Subject is required.");
            }}
          />

          <InputComponent
            label="Scope"
            required={true}
            name="scope"
            value={formData.scope}
            error_message={errors.scope}
            onChange={(e) => {
              handleOnChange(e, "Scope is required.");
            }}
          />

          <div className="flex flex-col gap-1">
            {/* <hr className="border-light-gray" /> */}
            <div className="flex flex-col gap-3 mt-3">
              <Typography variant="small" className="font-normal text-sm">
                <span className="font-bold">RE:</span> Service Quote for{" "}
                <span
                  className={`font-bold ${
                    !formData.subject && "bg-yellow-300"
                  }`}
                >
                  {formData.subject == "" ? "<subject here>" : formData.subject}
                </span>
              </Typography>
              <Typography variant="small" className="font-normal text-sm">
                Prepared by{" "}
                <span className="font-bold">{formData.billing_account}</span>{" "}
                (the legal company representing{" "}
                <span className="font-bold">FullSuite Compliance</span>),
                outlines the services and associated costs for{" "}
                <span className={`${!formData.scope && "bg-yellow-300"}`}>
                  {formData.scope == "" ? "<scope here>" : formData.scope}
                </span>{" "}
                with the specified government entities on behalf of{" "}
                <span className="font-bold">{formData.recipient_company}</span>{" "}
                (herein referred to as “ Client”),
              </Typography>
              <Typography variant="small" className="font-normal text-sm">
                FullSuite will carry out, under Partner Client's direction and
                approval, the scope of work as follows:
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
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
                <DialogComponent
                  dialogName={scopeDialog}
                  handlerDialog={handleScopeDialog}
                  submitDialog={() => {
                    console.log("Status Dialog");
                  }}
                  title="Add Scope of Work"
                  footerContent={
                    <div className="flex flex-row gap-3 pb-3">
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
                  }
                >
                  <div className="flex flex-col gap-2">
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
                </DialogComponent>
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
                            )} ${
                              formData.include_vat == "Yes" ? "+ 12% VAT" : ""
                            }`
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
            <div className="flex flex-col gap-3 mt-3">
              <Typography variant="small" className="font-normal text-sm">
                <span className="font-bold">RE:</span> Service Quote for{" "}
                <span className="font-bold">{formData.subject}</span>
              </Typography>
              <Typography variant="small" className="font-normal text-sm">
                Prepared by{" "}
                <span className="font-bold">{formData.billing_account}</span>{" "}
                (the legal company representing{" "}
                <span className="font-bold">FullSuite Compliance</span>),
                outlines the services and associated costs for{" "}
                <span className={`${!formData.scope && "bg-yellow-300"}`}>
                  {formData.scope == "" ? "<scope here>" : formData.scope}
                </span>{" "}
                with the specified government entities on behalf of{" "}
                <span className="font-bold">{formData.recipient_company}</span>{" "}
                (herein referred to as “ Client”),
              </Typography>
              <Typography variant="small" className="font-normal text-sm">
                FullSuite will carry out, under Partner Client's direction and
                approval, the scope of work as follows:
              </Typography>
            </div>
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
                          )} ${
                            formData.include_vat == "Yes" ? "+ 12% VAT" : ""
                          }`
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

  return formComponent;
};
