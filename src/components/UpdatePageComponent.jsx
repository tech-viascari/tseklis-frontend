import React, { useState } from "react";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { useNavigate } from "react-router";
import MainContent from "../pages/layouts/MainContent";
import ButtonComponent from "./ButtonComponent";
import FormComponent from "./FormComponent";
import { useDirtyContext } from "../providers/DirtyProvider";

const UpdatePageComponent = ({
  items,
  title,
  handleSubmitDialog,
  formComponent,
  pageIsLoading,
}) => {
  const { isDirty, setIsDirty } = useDirtyContext();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();

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
          navigate(-1);
        }
      } else {
        navigate(-1);
      }
    }
  };

  const handleNext = () => {
    if (selectedIndex < formComponent.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (selectedIndex == formComponent.length - 1) {
      handleSubmitDialog();
    }
  };

  return (
    <MainContent items={items}>
      <div className="flex flex-col h-full">
        <h1 className="text-md font-semibold text-lg">Update {title}</h1>
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
                {selectedIndex == formComponent.length - 1 ? "Update" : "Next"}
                <HiArrowSmallRight size={15} />
              </div>
            </ButtonComponent>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default UpdatePageComponent;
