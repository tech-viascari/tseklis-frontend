import {
  Button,
  Checkbox,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { HiEllipsisHorizontal, HiOutlinePlusCircle } from "react-icons/hi2";
import ButtonComponent from "../../../components/ButtonComponent";
import { toast } from "sonner";
import useChecklistStore from "../../../store/useChecklistStore";

const ChecklistPage = ({ checkLists = [], setCheckLists }) => {
  const [showMenu, setShowMenu] = useState(-1);

  const [showTextArea, setShowTextArea] = useState(false);

  const [textAreaValue, setTextAreaValue] = useState("");

  const textareaRef = useRef(null);

  const textareaEditRef = useRef(null);
  const [textAreaEditValue, setTextAreaEditValue] = useState("");
  const [selectedChecklistItem, setSelectedChecklistItem] = useState(null);

  const [showCompleted, setShowCompleted] = useState(true);
  const [numberOfCompleted, setNumberOfCompleted] = useState(0);

  const handleEdit = (item) => {
    setSelectedChecklistItem(item);
    setTextAreaEditValue(item.list_item);
  };

  const handleDelete = (item) => {
    const newCheckList = checkLists.filter(
      (checklist) => checklist.checklist_id !== item.checklist_id
    );
    setCheckLists(newCheckList);
    toast.success("Record deleted successfully.");
  };

  const handleAddTextArea = () => {
    if (textAreaValue.trim() === "") return;
    const newCheckList = {
      checklist_id: Date.now(),
      list_item: textAreaValue,
      checked: false,
    };
    setCheckLists([...checkLists, newCheckList]);
    setTextAreaValue("");
  };

  const handleUpdateTextArea = () => {
    if (textAreaEditValue.trim() === "") return;
    const newCheckList = checkLists.map((item) => {
      if (item.checklist_id === selectedChecklistItem.checklist_id) {
        return {
          ...item,
          list_item: textAreaEditValue,
        };
      }
      return item;
    });
    setCheckLists(newCheckList);
    setTextAreaEditValue("");
    setSelectedChecklistItem(null);
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    const textareaEdit = textareaEditRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    }

    if (textareaEdit) {
      textareaEdit.style.height = "auto"; // Reset height
      textareaEdit.style.height = `${textareaEdit.scrollHeight}px`; // Set new height
    }
  };

  const toggleHideOrShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  useEffect(() => {
    resizeTextarea(); // Resize on mount or value change
  }, [textAreaValue, textAreaEditValue]);

  useEffect(() => {
    const completedCount = checkLists.filter((item) => item.checked).length;
    setNumberOfCompleted(completedCount);
  }, [checkLists]);

  return (
    <div className="flex flex-col gap-2 pt-2 pb-10">
      {checkLists.map((list) => {
        if (!showCompleted && list.checked) return null;
        return (
          <div
            key={list.checklist_id}
            className="flex flex-row justify-between gap-3 items-center"
            onMouseEnter={() => {
              setShowMenu(list.checklist_id);
            }}
            onMouseLeave={() => {
              setShowMenu(-1);
            }}
          >
            <div className="flex flex-row gap-1 items-center justify-between w-full">
              <Checkbox
                className="font-normal text-sm"
                color="green"
                checked={list.checked}
                onChange={(e) => {
                  const updatedCheckList = checkLists.map((item) => {
                    if (item.checklist_id === list.checklist_id) {
                      return {
                        ...item,
                        checked: e.target.checked,
                      };
                    }
                    return item;
                  });
                  setCheckLists(updatedCheckList);
                }}
              />
              <div className="text-left w-full">
                {selectedChecklistItem != null &&
                selectedChecklistItem.checklist_id == list.checklist_id ? (
                  <textarea
                    rows={1}
                    ref={textareaEditRef}
                    className="w-full p-2 border border-light-gray rounded-md focus:outline-none focus:ring-1 focus:ring-light-gray text-sm"
                    value={textAreaEditValue}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.shiftKey) {
                        return;
                      }
                      if (
                        e.key === "Enter" ||
                        e.key === "Escape" ||
                        e.key === "Esc"
                      ) {
                        e.preventDefault();

                        handleUpdateTextArea();
                      }
                    }}
                    onChange={(event) => {
                      setTextAreaEditValue(event.target.value);
                    }}
                    onBlur={() => {
                      handleUpdateTextArea();
                    }}
                  ></textarea>
                ) : (
                  <Typography
                    variant="small"
                    className={`font-normal ${
                      list.checked ? "line-through" : ""
                    }`}
                  >
                    {list.list_item.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                )}
              </div>
              <div className="flex justify-end w-20">
                <div
                  className={`${showMenu == list.checklist_id ? "" : "hidden"}`}
                >
                  <Menu>
                    <MenuHandler>
                      <Button
                        variant="outlined"
                        className="bg-transparent border-none hover:bg-light-gray"
                        size="sm"
                      >
                        <HiEllipsisHorizontal size={20} />
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem
                        className="text-dark"
                        onClick={() => {
                          handleEdit(list);
                        }}
                      >
                        Edit Details
                      </MenuItem>

                      <hr className="my-1 text-light-gray" />

                      <MenuItem
                        onClick={() => {
                          handleDelete(list);
                        }}
                      >
                        <span className="text-red-400">Delete</span>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex flex-row">
        <div className="flex flex-row items-center justify-center  w-11">
          {!showTextArea && (
            <ButtonComponent
              className="bg-transparent border-none"
              onClick={() => {
                setShowTextArea(true);
              }}
            >
              <HiOutlinePlusCircle size={25} className="text-primary" />
            </ButtonComponent>
          )}
        </div>
        <div className="w-full">
          {showTextArea && (
            <textarea
              rows={1}
              ref={textareaRef}
              className="w-full p-2 border border-light-gray rounded-md focus:outline-none focus:ring-1 focus:ring-light-gray text-sm"
              value={textAreaValue}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  return;
                }
                if (e.key === "Enter") {
                  e.preventDefault();

                  handleAddTextArea();
                }
                if (e.key === "Escape" || e.key === "Esc") {
                  e.preventDefault();
                  setShowTextArea(false);
                }
              }}
              onChange={(event) => {
                setTextAreaValue(event.target.value);
              }}
              onBlur={() => {
                setShowTextArea(false);
              }}
            ></textarea>
          )}
          {/* <div className="flex flex-row  justify-end items-end">
            <div className="flex flex-row gap-2">
              <ButtonComponent
                variant="text"
                className="bg-transparent"
                onClick={(event) => {
                  setTextAreaValue("");
                }}
              >
                Clear
              </ButtonComponent>
              <ButtonComponent onClick={handleAddTextArea}>Add</ButtonComponent>
            </div>
          </div> */}
        </div>
      </div>

      {numberOfCompleted > 0 && (
        <div>
          <Button
            variant="text"
            size="sm"
            className="bg-transparent border-none hover:bg-light-gray text-black normal-case"
            onClick={toggleHideOrShowCompleted}
          >
            <Typography
              variant="small"
              className="font-normal text-sm underline"
            >
              {showCompleted
                ? "Hide Completed"
                : `${numberOfCompleted} Completed`}
            </Typography>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChecklistPage;
