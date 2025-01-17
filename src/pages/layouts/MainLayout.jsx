import React, { act, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import logo_mark from "../../assets/logos/logo_mark.svg";
import primary_logo from "../../assets/logos/primary_logo.svg";
import {
  HiChevronDown,
  HiDocumentText,
  HiOutlineArrowSmLeft,
} from "react-icons/hi";
import {
  HiBuildingOffice2,
  HiMiniUserGroup,
  HiSquares2X2,
} from "react-icons/hi2";

const MainLayout = () => {
  const [open, setOpen] = useState(true);

  const [active, setActive] = useState("Dashboard");
  const [expandMenu, setExpandMenu] = useState("");
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigation = [
    {
      title: "General",
      navigation: [
        {
          icon: <HiSquares2X2 className="text-xl" />,
          title: "Dashboard",
          submenus: [],
          isExpanded: false,
        },
        {
          icon: <HiDocumentText className="text-xl" />,
          title: "Quotes",
          submenus: [],
          isExpanded: false,
        },
        {
          icon: <HiBuildingOffice2 className="text-xl" />,
          title: "Legal Entities",
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
          isExpanded: true,
          submenus: [
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Users",
            },
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Roles",
            },
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Permissions",
            },
          ],
        },
      ],
    },
  ];

  const [navigationList, setNavigationList] = useState(navigation);

  const handleNavigate = (goto) => {
    // navigate("/");

    console.log(goto);

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
      setActive(goto.title);
    }

    if (windowWidth < 640) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 640) {
      setOpen(false);
    } else if (windowWidth >= 768 && windowWidth < 1024) {
      setOpen(true);
    } else if (windowWidth >= 1024 && windowWidth < 1280) {
      setOpen(true);
    } else if (windowWidth >= 1280 && windowWidth < 1536) {
      setOpen(true);
    } else if (windowWidth >= 1536) {
      setOpen(true);
    }
  }, [windowWidth]);

  return (
    <>
      <div className="flex">
        <div
          className={`h-screen bg-[#F5F7F9] ${
            open ? "w-72" : "w-20"
          }  relative`}
        >
          <HiOutlineArrowSmLeft
            className={`bg-[#F5F7F9] text-dark text-2xl rounded-full p-1 absolute border border-white -right-2.5 top-5 cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />

          <div className="py-3 px-5 ">
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
                className="w-8 duration-1000 rotate-[360deg] object-contain cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              />
            )}
          </div>

          <hr className="text-light" />

          <div className={`${open ? "px-5" : "px-2"}`}>
            <div className={`flex flex-col ${!open && "items-center"}`}>
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
                              className={`flex flex-row gap-3 items-center justify-between px-2 py-2 rounded-md hover:shadow-md hover:bg-white cursor-pointer ${
                                active == navigation.title &&
                                "bg-white shadow-md"
                              }`}
                              onClick={() => {
                                if (open) {
                                  handleNavigate({
                                    title: navigation.title,
                                    submenus: navigation.submenus,
                                    isExpanded: navigation.isExpanded,
                                  });
                                } else {
                                  setOpen(true);
                                }
                              }}
                            >
                              <div className="flex flex-row gap-3">
                                <span
                                  className={`${
                                    navigation.title == active && "text-primary"
                                  } `}
                                >
                                  {navigation.icon}
                                </span>
                                <p
                                  className={`font-regular text-sm ${
                                    !open && "hidden"
                                  } ${
                                    active == navigation.title &&
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
                                        className="flex items-center px-2 py-2 text-sm rounded-md hover:shadow-md hover:bg-white cursor-pointer"
                                      >
                                        {submenu.title}
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
        <div className="bg-white p-7">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
