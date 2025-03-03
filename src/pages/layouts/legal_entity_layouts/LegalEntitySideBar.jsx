import React, { useEffect, useState } from "react";
import useDrawerStore from "../../../store/useDrawerStore";
import {
  HiChevronDown,
  HiChevronUpDown,
  HiDocumentText,
  HiHome,
  HiMiniChatBubbleLeftRight,
  HiMiniUserGroup,
  HiSquares2X2,
} from "react-icons/hi2";
import { useNavigate, useParams } from "react-router";
import {
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { RiProfileFill } from "react-icons/ri";
import { PiFilesFill } from "react-icons/pi";
import InputComponent from "../../../components/InputComponent";

const LegalEntitySideBar = () => {
  const { entity_id } = useParams();
  const { open, setOpen } = useDrawerStore();

  const [active, setActive] = useState("/");
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const navigation = [
    {
      navigation: [
        {
          icon: <HiSquares2X2 className="text-xl" />,
          title: "Dashboard",
          goto: `legal-entities/v/${entity_id}/`,
          submenus: [],
          isExpanded: false,
        },
        {
          icon: <RiProfileFill className="text-xl" />,
          title: "Entity Profile",
          goto: `legal-entities/v/${entity_id}/entity-profile`,
          submenus: [],
          isExpanded: false,
        },
        {
          icon: <HiDocumentText className="text-xl" />,
          title: "GIS Tracker",
          goto: `legal-entities/v/${entity_id}/gis-tracker`,
          submenus: [],
          isExpanded: false,
        },
        {
          icon: <PiFilesFill className="text-xl" />,
          title: "Document Drafting",
          goto: `legal-entities/v/${entity_id}/document-drafting`,
          submenus: [],
          isExpanded: false,
        },
        {
          icon: <HiMiniChatBubbleLeftRight className="text-xl" />,
          title: "Board Meetings",
          goto: null,
          isExpanded: true,
          submenus: [
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Notice of Meeting",
              goto: `legal-entities/v/${entity_id}/notice-of-meeting`,
            },
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Minutes of Meeting",
              goto: `legal-entities/v/${entity_id}/minutes-of-meeting`,
            },
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Board Resolutions",
              goto: `legal-entities/v/${entity_id}/board-resolutions`,
            },
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Secretary Certificate",
              goto: `legal-entities/v/${entity_id}/secretary-certificate`,
            },
            {
              icon: <HiMiniUserGroup className="text-xl" />,
              title: "Treasurer Certificate",
              goto: `legal-entities/v/${entity_id}/treasurer-certificate`,
            },
          ],
        },
        // {
        //   icon: <PiListChecksFill className="text-xl" />,
        //   title: "Projects",
        //   goto: null,
        //   isExpanded: true,
        //   submenus: [
        //     {
        //       icon: <HiMiniUserGroup className="text-xl" />,
        //       title: "Tasks",
        //       goto: `legal-entities/v/${entity_id}/tasks`,
        //     },
        //     {
        //       icon: <HiMiniUserGroup className="text-xl" />,
        //       title: "Workflows",
        //       goto: `legal-entities/v/${entity_id}/workflows`,
        //     },
        //   ],
        // },
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
  const [searchEntity, setSearchEntity] = useState("");

  const handleOnChangeSearch = (e) => {
    setSearchEntity(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const params = window.location.pathname.split("/");
    if (params.length >= 4) {
      let param = params[4] != undefined ? params[4] : "";
      setActive(`legal-entities/v/${entity_id}/${param}`);
    } else {
      setActive(`legal-entities/v/1`);
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
      <div className="h-[60px] shadow flex flex-col justify-center">
        {open ? (
          <div className="flex flex-row items-center">
            <div
              className="px-4 py-5 border-r-[1px] border-light-gray cursor-pointer"
              onClick={() => {
                navigate("/legal-entities");
              }}
            >
              <HiHome size={20} />
            </div>
            <Menu
              open={openMenu}
              handler={setOpenMenu}
              dismiss={{
                itemPress: false,
              }}
            >
              <MenuHandler>
                <div
                  className="w-full flex flex-row px-3 justify-between items-center h-full cursor-pointer"
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  <Typography
                    variant="small"
                    className="font-semibold text-sm py-5 line-clamp-1"
                  >
                    Cloudeats PH. Inc
                  </Typography>
                  <div>
                    <HiChevronUpDown size={20} />
                  </div>
                </div>
              </MenuHandler>
              <MenuList className="w-60 p-3 gap-3 flex flex-col border border-light-gray shadow-2xl">
                <InputComponent
                  value={searchEntity}
                  onChange={handleOnChangeSearch}
                  placeholder="Search entity"
                />
                <div className="h-40 flex flex-col gap-1 overflow-y-auto">
                  {[1, 2, 3, 4].map((entity, index) => {
                    return (
                      <div
                        key={`entity-${index}`}
                        className="flex flex-row items-center gap-2 hover:bg-light-gray p-2 rounded cursor-pointer"
                        onClick={() => {
                          setOpenMenu(false);
                        }}
                      >
                        <img
                          src="https://docs.material-tailwind.com/img/face-2.jpg"
                          alt="avatar"
                          className="relative inline-block h-8 w-8 !rounded-full  object-cover object-center"
                        />
                        <Typography
                          variant="small"
                          className="font-semibold text-sm text-black"
                        >
                          Cloudeats PH. Inc.
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div className="flex flex-row gap-3 items-center justify-center md:w-[70%]">
            <HiHome size={20} />
          </div>
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
                              <div className="h-full bg-light/50 w-0.5"></div>
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

export default LegalEntitySideBar;
