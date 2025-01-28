import { Spinner } from "@material-tailwind/react";
import React from "react";
import { HiChevronRight } from "react-icons/hi2";

const FormComponent = ({
  formComponent,
  selectedIndex = 0,
  pageIsLoading = true,
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex flex-row gap-3 w-full">
        {formComponent.map((form, index) => {
          let className = ``;
          if (index <= selectedIndex) {
            className += " font-semibold";
          }
          return (
            <div
              key={`${form.title}-${index}`}
              className="flex flex-row items-center gap-3 text-sm"
            >
              <h1
                className={className}
                // onClick={() => {
                //   setSelectedIndex(index);
                // }}
              >
                {form.title}
              </h1>
              {index != formComponent.length - 1 && (
                <HiChevronRight size={15} />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col h-full rounded-2xl overflow-y-auto border border-light-gray">
        {pageIsLoading ? (
          <div className="rounded-2xl grid grid-cols-1 max-h-[calc(100vh-250px)]">
            <div className="rounded-2xl py-5 flex flex-col items-center justify-center h-full">
              <Spinner className="text-primary" />
            </div>
          </div>
        ) : (
          <div className="p-5 py-10 md:px-20 lg:px-40 max-h-[calc(100vh-250px)]">
            {formComponent[selectedIndex].form_contents}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormComponent;
