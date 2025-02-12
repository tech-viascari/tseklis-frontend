import React, { useState } from "react";
import InputComponent from "../../components/InputComponent";
import useCompanyEnrollmentStore from "../../store/useCompanyEnrollmentStore";

const {states} = useCompanyEnrollmentStore();

//this is the form state for the company enrollment
const [formData, setFormData] = useState(states.company.basic_information);
const [errors, setErrors] = useState({});


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

const AddForm = [
    getFormState(
      "Basic Information",
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
          <InputComponent
            label="Company Name"
            required={true}
            name="company_name"
            value={formData.company_name}
            error_message={errors.recipient_company}
            onChange={(e) => {
              handleOnChange(e, "Company Name is required.");
            }}
          />
          <InputComponent
            label="Company Address"
            required={true}
            name="company_address"
            value={formData.company_address}
            error_message={errors.company_address}
            onChange={(e) => {
              handleOnChange(e, "Company Address is required.");
            }}
          />
          <SelectComponent
            label="Type of Company"
            name="type_of_company"
            value={formData.type_of_company}
            error_message={errors.type_of_company}
            onSelectChange={(value) => {
              handleOnSelectChange("type_of_company", value, "Type of Company is required.");
            }}
            required={true}
            options={[
              { name: "USD", value: "USD" },
              { name: "PHP", value: "PHP" },
            ]}
          />

{/*           
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
          /> */}
        </div>
      </>
     ),
    // getFormState(
    //   "Scope of Work",
    //   <>
    //     <div className="w-full pb-10">
    //       <div className="flex flex-row justify-between items-center w-full">
    //         <Typography variant="small" className="font-semibold">
    //           Scope of Work: <span className="text-red-500">*</span>
    //         </Typography>
    //         <ButtonComponent
    //           className="bg-secondary text-light"
    //           onClick={handleScopeDialog}
    //         >
    //           Add scope
    //         </ButtonComponent>
    //         <Dialog open={scopeDialog} handler={handleScopeDialog}>
    //           <DialogBody className="text-dark">
    //             <div className="flex flex-col w-full px-5 pt-3">
    //               <Typography variant="small" className="font-bold text-md">
    //                 Add Scope of Work
    //               </Typography>
    //               <div className="flex flex-col mt-5 gap-2">
    //                 <InputComponent
    //                   label="Scope of work"
    //                   required={true}
    //                   name="task"
    //                   value={scopeFormData.task}
    //                   error_message={scopeErrors.task}
    //                   onChange={(e) => {
    //                     handleScopeOnChange(e, "Scope of Work is required.");
    //                   }}
    //                 />
    //                 <TextAreaComponent
    //                   label="Description"
    //                   required={true}
    //                   name="sub_task"
    //                   value={scopeFormData.sub_task}
    //                   error_message={scopeErrors.sub_task}
    //                   onChange={(e) => {
    //                     handleScopeOnChange(e, "Description is required.");
    //                   }}
    //                 />
    //                 <InputComponent
    //                   label="Service Fee"
    //                   type="number"
    //                   required={true}
    //                   name="service_fee"
    //                   value={scopeFormData.service_fee}
    //                   error_message={scopeErrors.service_fee}
    //                   onChange={(e) => {
    //                     handleScopeOnChange(e, "Service Fee is required.");
    //                   }}
    //                 />
    //                 <InputComponent
    //                   label="Out-of-pocket Expenses"
    //                   required={true}
    //                   name="oop_expenses"
    //                   value={scopeFormData.oop_expenses}
    //                   error_message={scopeErrors.oop_expenses}
    //                   onChange={(e) => {
    //                     handleScopeOnChange(
    //                       e,
    //                       "Out-of-pocket Expenses is required."
    //                     );
    //                   }}
    //                 />
    //               </div>
    //             </div>
    //           </DialogBody>
    //           <DialogFooter>
    //             <div className="flex flex-row gap-3 px-5 pb-3">
    //               <ButtonComponent
    //                 variant="outlined"
    //                 className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
    //                 onClick={handleScopeDialog}
    //               >
    //                 Cancel
    //               </ButtonComponent>

    //               {scopeIndex != -1 ? (
    //                 <ButtonComponent
    //                   className="bg-secondary"
    //                   onClick={handleScopeUpdate}
    //                 >
    //                   Update scope
    //                 </ButtonComponent>
    //               ) : (
    //                 <ButtonComponent
    //                   className="bg-secondary"
    //                   onClick={handleScopeAdd}
    //                 >
    //                   Add scope
    //                 </ButtonComponent>
    //               )}
    //             </div>
    //           </DialogFooter>
    //         </Dialog>
    //       </div>
    //       <div className=" flex flex-col gap-3">
    //         {formData.scope_of_work.length == 0 ? (
    //           <>
    //             <div className="py-5 text-center justify-center items-center flex flex-col">
    //               <HiMiniExclamationCircle
    //                 className="text-orange-500"
    //                 size={25}
    //               />

    //               <Typography
    //                 variant="small"
    //                 className="text-center text-[15px] font-medium"
    //               >
    //                 No scope of work added yet.
    //               </Typography>

    //               <Typography
    //                 variant="small"
    //                 className="font-normal text-center text-[12px]"
    //               >
    //                 Click the add button above to add a new scope of work.
    //               </Typography>
    //             </div>
    //           </>
    //         ) : (
    //           <ul className="list-disc ml-5 flex-1">
    //             {formData.scope_of_work.map((scope, index) => {
    //               const isPHP = formData.currency == "PHP";
    //               let service_fee = `${
    //                 isPHP
    //                   ? `PHP ${formatNumberWithCommaAndDecimal(
    //                       scope.service_fee
    //                     )} + 12% VAT`
    //                   : `${formatNumberWithCommaAndDecimal(
    //                       scope.service_fee
    //                     )} USD`
    //               }`;

    //               return (
    //                 <div key={`scope-${index}`} className="mt-3">
    //                   <li>
    //                     <div className="flex flex-row justify-between">
    //                       <div className="flex flex-col gap-1">
    //                         <Typography
    //                           variant="small"
    //                           className="text-justify font-normal"
    //                         >
    //                           <span className="font-semibold">
    //                             {scope.task}
    //                           </span>{" "}
    //                           <span>{scope.sub_task}</span>
    //                         </Typography>
    //                         <Typography
    //                           variant="small"
    //                           className="font-semibold"
    //                         >
    //                           Service Fee: {service_fee}
    //                         </Typography>
    //                         <Typography
    //                           variant="small"
    //                           className="font-semibold"
    //                         >
    //                           OOP Expenses: {scope.oop_expenses}
    //                         </Typography>
    //                       </div>
    //                       <div className="flex flex-col px-5">
    //                         <Menu placement="bottom-end">
    //                           <MenuHandler>
    //                             <Button
    //                               variant="filled"
    //                               size="sm"
    //                               className="bg-white shadow-none hover:shadow-md normal-case font-medium border-light-gray focus:!border-light-gray"
    //                             >
    //                               <HiOutlineEllipsisHorizontal
    //                                 size={20}
    //                                 className="text-dark"
    //                               />
    //                             </Button>
    //                           </MenuHandler>
    //                           <MenuList>
    //                             <MenuItem
    //                               onClick={(e) => {
    //                                 handleScopeDialog(e, scope);
    //                                 setScopeIndex(index);
    //                               }}
    //                             >
    //                               Edit
    //                             </MenuItem>
    //                             <MenuItem
    //                               className="text-red-400"
    //                               onClick={() => {
    //                                 let filteredScopeOfWork =
    //                                   formData.scope_of_work.filter(
    //                                     (_, _index) => _index != index
    //                                   );

    //                                 setFormData({
    //                                   ...formData,
    //                                   scope_of_work: filteredScopeOfWork,
    //                                 });
    //                               }}
    //                             >
    //                               Delete
    //                             </MenuItem>
    //                           </MenuList>
    //                         </Menu>
    //                       </div>
    //                     </div>
    //                   </li>
    //                 </div>
    //               );
    //             })}
    //           </ul>
    //         )}
    //       </div>
    //     </div>
    //   </>
    // ),
    // getFormState(
    //   "Review Information",
    //   <>
    //     <div className="flex flex-col gap-5 pb-10">
    //       <div>
    //         <Typography variant="small" className="font-semibold text-md">
    //           Review Information
    //         </Typography>
    //         <Typography variant="small" className="font-normal text-sm">
    //           Kindly verify the details before submitting the record.
    //         </Typography>
    //       </div>

    //       <ReviewComponent
    //         title="Basic Information"
    //         data={[
    //           {
    //             name: "Recipient's Company",
    //             value: formData.recipient_company,
    //           },
    //           {
    //             name: "Recipient's Address",
    //             value: formData.recipient_address,
    //           },
    //           {
    //             name: "Recipient's Name",
    //             value: formData.recipient_name,
    //           },
    //           {
    //             name: "Recipient's Email",
    //             value: formData.recipient_email,
    //           },
    //           {
    //             name: "Currency",
    //             value: formData.currency,
    //           },
    //           {
    //             name: "Billing Account",
    //             value: formData.billing_account,
    //           },
    //           {
    //             name: "Due Date",
    //             value: formattedDate(formData.due_date),
    //           },
    //         ]}
    //       />

    //       <div className="flex flex-col gap-1">
    //         <Typography variant="small" className="font-semibold text-sm">
    //           Scope of Work
    //         </Typography>
    //         <hr className="border-light-gray" />
    //         <div className="flex flex-col gap-2">
    //           {formData.scope_of_work.length == 0 ? (
    //             <>
    //               <div className="py-5 text-center justify-center items-center flex flex-col">
    //                 <HiMiniExclamationCircle
    //                   className="text-orange-500"
    //                   size={25}
    //                 />

    //                 <Typography
    //                   variant="small"
    //                   className="text-center text-sm font-medium"
    //                 >
    //                   No scope of work added yet.
    //                 </Typography>
    //               </div>
    //             </>
    //           ) : (
    //             <ul className="list-disc ml-5 flex-1 mt-1 gap-1 flex flex-col">
    //               {formData.scope_of_work.map((scope, index) => {
    //                 const isPHP = formData.currency == "PHP";
    //                 let service_fee = `${
    //                   isPHP
    //                     ? `PHP ${formatNumberWithCommaAndDecimal(
    //                         scope.service_fee
    //                       )} + 12% VAT`
    //                     : `${formatNumberWithCommaAndDecimal(
    //                         scope.service_fee
    //                       )} USD`
    //                 }`;

    //                 return (
    //                   <div key={`scope-${index}`}>
    //                     <li>
    //                       <div className="flex flex-row justify-between">
    //                         <div className="flex flex-col gap-1">
    //                           <Typography
    //                             variant="small"
    //                             className="text-justify text-sm font-normal"
    //                           >
    //                             <span className="font-semibold text-sm">
    //                               {scope.task}
    //                             </span>{" "}
    //                             <span className="text-sm">
    //                               {scope.sub_task}
    //                             </span>
    //                           </Typography>
    //                           <Typography
    //                             variant="small"
    //                             className="font-semibold"
    //                           >
    //                             Service Fee: {service_fee}
    //                           </Typography>
    //                           <Typography
    //                             variant="small"
    //                             className="font-semibold"
    //                           >
    //                             OOP Expenses: {scope.oop_expenses}
    //                           </Typography>
    //                         </div>
    //                       </div>
    //                     </li>
    //                   </div>
    //                 );
    //               })}
    //             </ul>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // ),
  ];

  export default AddForm;