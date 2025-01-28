import React from "react";
import { HiChevronRight } from "react-icons/hi2";
import { useNavigate } from "react-router";

const BreadCrumbsComponent = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center gap-2">
      {items.map((item, index) => {
        return (
          <div
            key={`breadcrumbs-${index}`}
            className="flex flex-row gap-2 items-center"
          >
            {index != items.length - 1 ? (
              <span
                className="text-dark text-[12px] font-medium cursor-pointer"
                onClick={() => {
                  navigate(item.goto);
                }}
              >
                {item.title}
              </span>
            ) : (
              <span className="text-dark text-[12px] font-normal">
                {item.title}
              </span>
            )}

            {index != items.length - 1 && <HiChevronRight size={10} />}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbsComponent;
