import React, { useEffect, useState } from "react";
import useDrawerStore from "../../../store/useDrawerStore";
import primary_logo from "../../../assets/logos/primary_logo.svg";
import logo_mark from "../../../assets/logos/logo_mark.svg";
import {
  HiChevronDown,
  HiDocumentText,
  HiMiniUserGroup,
  HiSquares2X2,
} from "react-icons/hi2";
import { useNavigate } from "react-router";

const MainSideBar = () => {
  const { open, setOpen } = useDrawerStore();

  const [active, setActive] = useState("/");
  const navigate = useNavigate();

  const navigation = [
    {
      title: "General",
      navigation: [
        {
          icon: <HiSquares2X2 className="text-xl" />,
          title: "Dashboard",
          goto: "/",
          submenus: [],
          isExpanded: false,
        },
        {
          icon: <HiDocumentText className="text-xl" />,
          title: "Quotes",
          goto: "/quotes",
          submenus: [],
          isExpanded: false,
        },
      ],
    },
    {
      title: "Settings",
      navigation: [
        {
          icon: <HiMiniUserGroup className="text-xl" />,
          title: "User Management",
          goto: null,
          isExpanded: true,
          submenus: [
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Users",
              goto: "/users",
            },
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Roles",
              goto: "/roles",
            },
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Permissions",
              goto: "/permissions",
            },
          ],
        },
      ],
    },
  ];

  const [navigationList, setNavigationList] = useState(navigation);

  const handleNavigate = (goto) => {
    if (goto.submenus.length != 0) {
      let updatedNavList = navigationList.map((navList) => {
        let nav = navList.navigation.map((navigate) => {
          if (goto.title == navigate.title) {
            navigate.isExpanded = !navigate.isExpanded;
          }
          return navigate;
        });
        navList.navigation = nav;
        return navList;
      });
      setNavigationList(updatedNavList);
    } else {
      setActive(goto.goto);
    }

    if (windowWidth < 640) {
      setOpen(false);
    }

    navigate(goto.goto);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const params = window.location.pathname.split("/");
    if (params.length >= 2) {
      setActive(`/${params[1]}`);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 640) {
      // Small screens (sm) - Mobile devices
      setOpen(false);
    } else if (windowWidth >= 640 && windowWidth < 768) {
      // Medium screens (md) - Tablets and small devices
      setOpen(true);
    } else if (windowWidth >= 768 && windowWidth < 1024) {
      // Large screens (lg) - Tablets and small laptops
      setOpen(true);
    } else if (windowWidth >= 1024 && windowWidth < 1280) {
      // Extra large screens (xl) - Desktops or large tablets
      setOpen(true);
    } else if (windowWidth >= 1280) {
      // XXL screens - Very large desktops or ultra-wide monitors
      setOpen(true);
    }
  }, [windowWidth]);

  return (
    <div
      className={`bg-[#F5F7F9] ${
        open ? "w-64" : "w-20"
      } fixed h-screen left-0 z-20 shadow`}
      onMouseEnter={() => {
        setOpen(true);
      }}
    >
      <div className="py-3 px-5 h-[60px] shadow">
        {open ? (
          <img
            src={primary_logo}
            alt=""
            className="w-24 object-contain cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        ) : (
          <img
            src={logo_mark}
            alt=""
            className="w-8 duration-1000 rotate-[360deg] object-contain cursor-pointer ml-1"
            onClick={() => {
              navigate("/");
            }}
          />
        )}
      </div>

      <div className={`${open ? "px-5" : "px-2"} `}>
        <div className={`flex flex-col ${!open && "items-center"} `}>
          {navigationList.map((nav, index) => {
            return (
              <div key={`nav-${index}`} className="flex flex-col mt-5">
                <div className="flex flex-col gap-2">
                  <p
                    className={`${
                      open ? "text-[12px]" : "text-[10px]"
                    } font-medium`}
                  >
                    {nav.title}
                  </p>
                  {nav.navigation.map((navigation) => {
                    return (
                      <div key={`nav-${navigation.title}`}>
                        <div
                          className={`flex flex-row gap-3 items-center justify-between px-2 py-2 rounded-md hover:shadow-sm hover:bg-white cursor-pointer ${
                            active == navigation.goto && "bg-white shadow-sm"
                          }`}
                          onClick={() => {
                            if (open) {
                              handleNavigate({
                                title: navigation.title,
                                submenus: navigation.submenus,
                                isExpanded: navigation.isExpanded,
                                goto: navigation.goto,
                              });
                            } else {
                              setOpen(true);
                            }
                          }}
                        >
                          <div className="flex flex-row gap-3">
                            <span
                              className={`${
                                navigation.goto == active && "text-primary"
                              } `}
                            >
                              {navigation.icon}
                            </span>
                            <p
                              className={`font-regular text-sm line-clamp-1 ${
                                !open && "hidden"
                              } ${
                                active == navigation.goto &&
                                "text-primary font-regular"
                              }`}
                            >
                              {navigation.title}
                            </p>
                          </div>
                          {navigation.submenus.length != 0 && open && (
                            <span>
                              <HiChevronDown
                                className={`duration-500 ${
                                  !navigation.isExpanded && "rotate-90"
                                }`}
                              />
                            </span>
                          )}
                        </div>

                        {navigation.submenus.length != 0 && open && (
                          <div
                            className={`flex flex-row transition-all duration-300 overflow-hidden ease-in-out ${
                              navigation.isExpanded
                                ? "translate-y-5 opacity-100 h-full -mt-5 mb-5"
                                : "translate-y-0 opacity-0 h-0 "
                            }`}
                          >
                            <div className="w-10 flex items-center justify-center">
                              <div className="h-full bg-light w-0.5"></div>
                            </div>
                            <div className="flex flex-col w-full gap-2 py-3">
                              {navigation.submenus.map((submenu, index) => {
                                return (
                                  <div
                                    key={`submenu-${index}`}
                                    className={`flex items-center px-2 py-2 text-sm rounded-md hover:shadow-md hover:bg-white cursor-pointer ${
                                      active == submenu.goto &&
                                      "bg-white shadow-md"
                                    }`}
                                    onClick={() => {
                                      handleNavigate({
                                        title: submenu.title,
                                        submenus: [],
                                        isExpanded: false,
                                        goto: submenu.goto,
                                      });
                                    }}
                                  >
                                    <p
                                      className={`${
                                        active == submenu.goto &&
                                        "text-primary text-semibold"
                                      }`}
                                    >
                                      {submenu.title}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainSideBar;
