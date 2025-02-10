import React, { useEffect, useState } from "react";
import MainContent from "../pages/layouts/MainContent";
import { useDirtyContext } from "../providers/DirtyProvider";
import { useNavigate } from "react-router";
import ButtonComponent from "./ButtonComponent";
import FormComponent from "../components/FormComponent";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

const AddPageComponent = ({
  items,
  title,
  subtitle,
  handleSubmit,
  goBackTo,
  formComponent,
  setToDefault,
  pageIsLoading
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
          navigate(goBackTo);
        }
      } else {
        navigate(goBackTo);
      }
    }
  };

  const handleNext = () => {
    if (selectedIndex < formComponent.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (selectedIndex == formComponent.length - 1) {
      handleSubmit();
    }
  };


  useEffect(() => {
    setToDefault();
  }, []);

  return (
    <MainContent items={items}>
      <div className="flex flex-col h-full">
        <h1 className="text-md font-semibold text-lg">{title}</h1>
        <p className="text-sm font-normal">{subtitle}</p>

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
    </MainContent>
  );
};

export default AddPageComponent;
