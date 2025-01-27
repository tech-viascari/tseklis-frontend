import React, { useEffect, useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import BreadCrumbsComponent from "../../components/BreadCrumbsComponent";
import { toast } from "sonner";
import { HiOutlineBell } from "react-icons/hi2";
import useDrawerStore from "../../store/useDrawerStore.js";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router";
import { handleLogout } from "../../services/authServices.js";

const TopBar = ({ items }) => {
  const { open, setOpen } = useDrawerStore();

  const { logout } = useAuthStore();

  const [showMenu, setShowMenu] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={`w-full fixed z-10 ${open ? "pl-64" : "pl-20"}`}>
      <div className="w-full z-10 h-[60px] bg-white flex flex-row justify-between items-center px-5 shadow">
        <div className="flex flex-row gap-2 items-center">
          {open ? (
            <GoSidebarExpand
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setOpen(false);
              }}
            />
          ) : (
            <GoSidebarCollapse
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
            />
          )}
          <span className="flex-1 h-5 border-[0.5px] text-light-gray"></span>
          <BreadCrumbsComponent items={items} />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              toast.info("There are no notifications to display.");
            }}
          >
            <HiOutlineBell size={20} className="text-dark" />
          </div>

          <div className="relative inline-block text-left">
            <button
              className="w-7 h-7 font-bold text-light rounded-full bg-secondary flex items-center justify-center font-mono cursor-pointer"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              onBlur={() => {
                if (!isMenuActive) {
                  setShowMenu(false);
                }
              }}
            >
              <span className="text-[13px]">BP</span>
            </button>

            <div
              className={`${
                showMenu ? "" : "hidden"
              } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
              onMouseEnter={() => {
                setIsMenuActive(true);
              }}
              onMouseLeave={() => {
                setIsMenuActive(false);
              }}
            >
              <div
                className=" px-4 py-2 text-sm text-gray-900 outline-none hover:bg-light-gray w-full cursor-pointer"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                Account Settings
              </div>
              <div
                className=" px-4 py-2 text-sm text-gray-900 outline-none hover:bg-light-gray w-full cursor-pointer"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                Support
              </div>
              <div
                className=" px-4 py-2 text-sm text-gray-900 outline-none hover:bg-light-gray w-full cursor-pointer"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                License
              </div>
              <span
                className="block px-4 py-2 text-sm text-red-400 hover:bg-red-400 hover:text-white  outline-none w-full cursor-pointer"
                onClick={() => {
                  handleLogout(logout, () => {
                    navigate("/login");
                  });
                }}
              >
                Sign Out
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
