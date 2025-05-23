import { Typography } from "@material-tailwind/react";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import {
  formatFullName,
  formatNumberWithCommaAndDecimal,
  formattedDate,
} from "../../utils/global";
import TextAreaComponent from "../../components/TextAreaComponent";
import { HiMiniExclamationCircle, HiMinusCircle } from "react-icons/hi2";
import ReviewComponent from "../../components/ReviewComponent";
import SelectMultipleComponent from "../../components/SelectMultipleComponent";
import ChecklistPage from "./checklist/ChecklistPage";
import { useEffect, useState } from "react";
import useProjectStore from "../../store/useProjectStore";
import AssigneeAvatarComponent from "../../components/AssigneeAvatarComponent";

export const GetFormComponent = ({
  formData,
  setFormData,
  errors,
  setErrors,
  setIsDirty,
  checkLists,
  setCheckLists,
  activeUsers,
  assignee,
  setAssignee,
  selectedListOfAssignee,
  setSelectedListOfAssignee,
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

  const { states } = useProjectStore();

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
      "Project Information",
      <>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <Typography variant="small" className="font-normal text-sm">
              STEP ONE
            </Typography>
            <Typography variant="small" className="font-bold text-md">
              Project Information
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-5 pb-10">
            <InputComponent
              label="Project Name"
              required={true}
              name="project_name"
              value={formData.project_name}
              error_message={errors.project_name}
              onChange={(e) => {
                handleOnChange(e, "Project Name is required.");
              }}
            />
            <TextAreaComponent
              label="Project Description"
              name="desc"
              value={formData.desc}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <InputComponent
                label="Project Start Date"
                required={true}
                name="start_date"
                value={formData.start_date == null ? "" : formData.start_date}
                type="date"
                onChange={(e) => {
                  handleOnChange(e, "Start Date is required.");
                }}
              />
              <InputComponent
                label="Project Target Date"
                required={true}
                name="target_date"
                value={formData.target_date == null ? "" : formData.target_date}
                type="date"
                onChange={(e) => {
                  handleOnChange(e, "Target Date is required.");
                }}
              />
            </div>
            <SelectMultipleComponent
              label="Assignee"
              options={activeUsers.map((assignee) => {
                return {
                  label: assignee.name,
                  value: assignee.user_id,
                };
              })}
              name="assignee"
              value={selectedListOfAssignee}
              onSelectChange={(value) => {
                setSelectedListOfAssignee(value);
              }}
              isMulti={true}
              required={true}
            ></SelectMultipleComponent>

            <div className="flex flex-col gap-2">
              <div>
                <Typography variant="small" className="text-sm font-medium">
                  Google Drive Folder
                </Typography>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="col-span-1">
                  <InputComponent
                    label="Text"
                    name="name"
                    value={formData.google_project_folder.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        google_project_folder: {
                          ...formData.google_project_folder,
                          name: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <InputComponent
                    label="URL"
                    name="link"
                    value={formData.google_project_folder.link}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        google_project_folder: {
                          ...formData.google_project_folder,
                          link: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <Typography variant="small" className="text-sm font-medium">
                  Executed Documents
                </Typography>
                <ButtonComponent
                  onClick={() => {
                    setFormData({
                      ...formData,
                      executed_documents: [
                        ...formData.executed_documents,
                        states.attachment_view,
                      ],
                    });
                  }}
                >
                  Add Row
                </ButtonComponent>
              </div>
              <div className="flex flex-row items-center justify-between gap-1 w-full">
                {formData.executed_documents.length != 0 ? (
                  <div className="flex flex-col gap-3 w-full">
                    {formData.executed_documents.map((item, index) => {
                      return (
                        <div className="flex flex-row items-center justify-between gap-1 w-full">
                          <div className="w-[35%] flex">
                            <div className="w-full">
                              <InputComponent
                                label="Text"
                                name="name"
                                value={item.name}
                                onChange={(e) => {
                                  let updatedExecutedDocuments =
                                    formData.executed_documents;
                                  updatedExecutedDocuments[index] = {
                                    ...updatedExecutedDocuments[index],
                                    name: e.target.value,
                                  };
                                  setFormData({
                                    ...formData,
                                    executed_documents:
                                      updatedExecutedDocuments,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-[60%] flex">
                            <div className="w-full">
                              <InputComponent
                                label="URL"
                                name="link"
                                value={item.link}
                                onChange={(e) => {
                                  let updatedExecutedDocuments =
                                    formData.executed_documents;
                                  updatedExecutedDocuments[index] = {
                                    ...updatedExecutedDocuments[index],
                                    link: e.target.value,
                                  };
                                  setFormData({
                                    ...formData,
                                    executed_documents:
                                      updatedExecutedDocuments,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-[5%] flex mt-5 ml-2 flex-end">
                            <div className="w-full ">
                              <ButtonComponent
                                className="p-0"
                                onClick={() => {
                                  const newDocuments =
                                    formData.executed_documents.filter(
                                      (_, idx) => index != idx
                                    );

                                  setFormData({
                                    ...formData,
                                    executed_documents: newDocuments,
                                  });
                                }}
                              >
                                <HiMinusCircle size={20} color="red" />
                              </ButtonComponent>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-2 text-center w-full">
                      <Typography variant="small" className="text-sm font-bold">
                        No documents attached.
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-sm font-normal"
                      >
                        Click the button{" "}
                        <span className="font-medium">"Add row"</span> to attach
                        documents.
                      </Typography>
                    </div>
                  </>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </>
    ),
    getFormState(
      "Checklist",
      <>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <Typography variant="small" className="font-normal text-sm">
              STEP TWO
            </Typography>
            <Typography variant="small" className="font-bold text-md">
              Checklist
            </Typography>
          </div>
          <ChecklistPage
            checkLists={checkLists}
            setCheckLists={setCheckLists}
          />
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
            title="Project Information"
            data={[
              {
                name: "Project Name",
                value: formData.project_name,
              },
              {
                name: "Project Description",
                value: formData.desc,
              },
              {
                name: "Project Start Date",
                value: formattedDate(formData.start_date),
              },
              {
                name: "Project Target Date",
                value: formattedDate(formData.target_date),
              },
              {
                name: "Assignee",
                value: (
                  <>
                    <AssigneeAvatarComponent assignees={assignee} size="xs" />
                  </>
                ),
              },
              {
                name: "Google Drive Folder",
                value: (
                  <>
                    <div className="flex flex-row">
                      {formData.google_project_folder.name != "" &&
                      formData.google_project_folder.link != "" ? (
                        <a
                          href={
                            formData.google_project_folder.name != "" &&
                            formData.google_project_folder.link != ""
                              ? formData.google_project_folder.link
                              : ""
                          }
                          target="_blank"
                        >
                          <Typography
                            variant="small"
                            className="text-sm font-normal text-blue-500 underline"
                          >
                            {formData.google_project_folder.name != "" &&
                              formData.google_project_folder.link != "" &&
                              formData.google_project_folder.name}
                          </Typography>
                        </a>
                      ) : (
                        <Typography
                          variant="small"
                          className="text-sm font-normal"
                        >
                          --
                        </Typography>
                      )}
                    </div>
                  </>
                ),
              },
              // {
              //   name: "Executed Documents",
              //   value: (
              //     <>
              //       {formData.executed_documents.length > 0 ? (
              //         formData.executed_documents.map((doc) => {
              //           if (doc.name == "") return;
              //           return (
              //             <div className="flex flex-row">
              //               <a
              //                 href={doc.link != "" ? doc.link : ""}
              //                 target="_blank"
              //               >
              //                 <Typography
              //                   variant="small"
              //                   className="text-sm font-normal text-blue-500 underline"
              //                 >
              //                   {doc.name}
              //                 </Typography>
              //               </a>
              //             </div>
              //           );
              //         })
              //       ) : (
              //         <Typography
              //           variant="small"
              //           className="text-sm font-normal"
              //         >
              //           --
              //         </Typography>
              //       )}
              //     </>
              //   ),
              // },
            ]}
          />

          <div className="flex flex-col gap-1">
            <Typography variant="small" className="font-semibold text-sm">
              Checklist
            </Typography>
            <hr className="border-light-gray" />
            <div className="flex flex-col gap-3 mt-3">
              <ul className="ml-10">
                {checkLists.map((list, index) => {
                  return (
                    <li className="list-disc" key={`list-item-${index}`}>
                      <Typography
                        variant="small"
                        className="text-sm font-normal"
                      >
                        {list.list_item}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  ];

  return formComponent;
};
