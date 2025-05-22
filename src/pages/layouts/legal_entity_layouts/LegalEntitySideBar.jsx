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
  Avatar,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { RiProfileFill } from "react-icons/ri";
import { PiFilesFill } from "react-icons/pi";
import useLegalEntities from "../../../store/useLegalEntities";
import axiosInstance from "../../../utils/axiosHelper";
import ButtonComponent from "../../../components/ButtonComponent";

const LegalEntitySideBar = () => {
  const { entity_id } = useParams();
  const { open, setOpen } = useDrawerStore();

  const [active, setActive] = useState("/");
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [isEntityProfile, setIsEntityProfile] = useState(true);

  const { states, entity, setEntity, entities, setEntities } =
    useLegalEntities();

  const [listOfEntities, setListOfEntities] = useState([]);

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
        // {
        //   icon: <HiMiniChatBubbleLeftRight className="text-xl" />,
        //   title: "Board Meetings",
        //   goto: null,
        //   isExpanded: true,
        //   submenus: [
        //     {
        //       icon: <HiMiniUserGroup className="text-xl" />,
        //       title: "Notice of Meeting",
        //       goto: `legal-entities/v/${entity_id}/notice-of-meeting`,
        //     },
        //     {
        //       icon: <HiMiniUserGroup className="text-xl" />,
        //       title: "Minutes of Meeting",
        //       goto: `legal-entities/v/${entity_id}/minutes-of-meeting`,
        //     },
        //     {
        //       icon: <HiMiniUserGroup className="text-xl" />,
        //       title: "Board Resolutions",
        //       goto: `legal-entities/v/${entity_id}/board-resolutions`,
        //     },
        //     {
        //       icon: <HiMiniUserGroup className="text-xl" />,
        //       title: "Secretary Certificate",
        //       goto: `legal-entities/v/${entity_id}/secretary-certificate`,
        //     },
        //     {
        //       icon: <HiMiniUserGroup className="text-xl" />,
        //       title: "Treasurer Certificate",
        //       goto: `legal-entities/v/${entity_id}/treasurer-certificate`,
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

  const fetchListOfEntities = () => {
    const filteredEntities = entities.filter(
      (_entity) => _entity.entity_id != entity_id
    );
    setListOfEntities(filteredEntities);
  };

  const DisplayEntityList = listOfEntities
    .filter((_entity) => {
      if (!_entity.status) return false;
      if (searchEntity == "") {
        return _entity;
      } else if (
        _entity.entity_details.company_name
          .toLocaleLowerCase()
          .includes(searchEntity.toLocaleLowerCase()) ||
        _entity.entity_details.sec_registration_number
          .toLocaleLowerCase()
          .includes(searchEntity.toLocaleLowerCase())
      ) {
        return _entity;
      }
    })
    .map((_entity, index) => {
      if (!_entity.status) return;
      return (
        <div
          key={_entity.entity_id}
          className="flex flex-row items-center gap-3 border-light-gray border hover:bg-light-gray p-2 rounded-xl cursor-pointer"
          onClick={() => {
            window.location.href = `/legal-entities/v/${_entity.entity_id}/`;
            setEntity(_entity);
          }}
        >
          <div className="w-16 aspect-square flex flex-col items-center justify-center">
            <Avatar
              src={_entity.entity_logo}
              alt="avatar"
              className="object-contain"
            />
          </div>
          <Typography
            variant="small"
            className="font-medium text-sm text-black w-full"
          >
            {_entity.entity_details.company_name}
          </Typography>
        </div>
      );
    });

  const ChangeCompanyComponent = () => {
    return (
      <>
        <Input
          label="Search Entity"
          variant="standard"
          value={searchEntity}
          onChange={handleOnChangeSearch}
        />
        <div className="max-h-40 flex flex-col gap-3 overflow-y-auto ">
          {DisplayEntityList.length > 0 ? (
            DisplayEntityList
          ) : (
            <span>No records found.</span>
          )}
        </div>
      </>
    );
  };

  const EntityProfileComponent = () => {
    return (
      <>
        <div className="flex flex-col gap-5 items-center w-full">
          <Avatar
            className="h-20 w-20 object-contain border-light-gray border p-3"
            src={entity.entity_logo}
          ></Avatar>
          <div className="flex flex-col gap-1 text-center">
            <Typography variant="small" className="text-md font-bold">
              {entity.entity_details.company_name}
            </Typography>
            <Typography variant="small" className="text-sm font-medium">
              {entity.entity_details.sec_registration_number}
            </Typography>
          </div>
        </div>
      </>
    );
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

  const fetchEntity = async () => {
    if (entity.entity_id == "") {
      try {
        const response = await axiosInstance.get(
          `/legal-entities/${entity_id}/`
        );
        if (response.status === 200) {
          setEntity(response.data.entity);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchEntities = async () => {
    if (entities.length == 0) {
      try {
        const response = await axiosInstance.get(`/legal-entities/`);
        if (response.status === 200) {
          setEntities(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setActive(
      window.location.pathname.split("/")[4] === "" ||
        window.location.pathname.split("/")[4] === undefined
        ? `legal-entities/v/${entity_id}/`
        : `legal-entities/v/${entity_id}/${
            window.location.pathname.split("/")[4]
          }`
    );

    fetchEntity();
  }, [window.location.pathname]);

  useEffect(() => {
    fetchEntities();
  }, []);

  useEffect(() => {
    fetchListOfEntities();
  }, [entities]);

  return (
    <div
      className={`bg-[#F5F7F9] ${
        open ? "w-64" : "w-20"
      } fixed h-screen left-0 z-20 shadow`}
      onMouseEnter={() => {
        // setOpen(true);
      }}
    >
      <div className="h-[60px] shadow flex flex-col justify-center">
        {open ? (
          <div className="flex flex-row items-center w-full">
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
                  className="w-[203px] flex flex-row px-3 justify-between items-center h-full cursor-pointer"
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  <Typography
                    variant="small"
                    className="font-semibold text-sm py-5 text-nowrap line-clamp-1 text-ellipsis"
                  >
                    {entity.entity_details.company_name}
                  </Typography>
                  <div>
                    <HiChevronUpDown size={20} />
                  </div>
                </div>
              </MenuHandler>
              <MenuList className="ml-14 w-[25%] gap-3 p-5 flex flex-col border border-light-gray shadow-2xl">
                <div
                  className="text-end flex flex-row items-end justify-end"
                  tabIndex={0}
                >
                  <Typography
                    variant="small"
                    className="font-normal text-sm underline cursor-pointer"
                    onClick={() => {
                      setIsEntityProfile(!isEntityProfile);
                    }}
                  >
                    {isEntityProfile ? "Change" : "Cancel"}
                  </Typography>
                </div>
                {isEntityProfile
                  ? EntityProfileComponent()
                  : ChangeCompanyComponent()}
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div
            className="flex flex-row gap-3 items-center justify-center cursor-pointer"
            onClick={() => {
              navigate("/legal-entities");
            }}
          >
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
                              className={`font-regular text-[13px] line-clamp-1 ${
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
