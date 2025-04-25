import React from "react";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Input,
  Typography,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import ButtonComponent from "./ButtonComponent";

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-red-300"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
        className="text-red-300"
      />
    </svg>
  );
}

export function ListWithIcon({
  formData,
  data,
  title,
  setData,
  setFormData,
  targetKey,
}) {
  const handleAddRow = () => {
    let appendName = formData[targetKey];
    appendName.push({ name: "" });
    setFormData({ ...formData, [targetKey]: appendName });
  };

  const handleDeleteRow = (index) => {
    let appendName = formData[targetKey];
    appendName.splice(index, 1);
    setFormData({ ...formData, [targetKey]: appendName });
  };

  const handleOnChange = (e, index) => {
    const { value, name } = e.target;
    let appendName = formData[targetKey][index];
    appendName.name = value;
    setFormData({
      ...formData,
      [targetKey]: formData[targetKey].map((item, i) =>
        i === index ? { ...item, name: value, position: "Stockholder" } : item
      ),
    });
  };

  return (
    <>
      <List className="w-full gap-3 p-0">
        <div className="flex flex-row justify-between items-center mt-5">
          <Typography variant="small" className="font-medium">
            {title}
          </Typography>

          <ButtonComponent className="bg-secondary" onClick={handleAddRow}>
            Add row
          </ButtonComponent>
        </div>
        {data.length > 0 && (
          <>
            {data.map((item, index) => (
              <ListItem
                ripple={true}
                className="w-full flex justify-between gap-2 px-0 py-4"
                key={index}
              >
                <Input
                  label={`${title} ${index + 1}`}
                  required
                  name={`name_${index}`}
                  value={item.name}
                  onChange={(e) => {
                    handleOnChange(e, index);
                  }}
                />
                <ListItemSuffix onClick={() => handleDeleteRow(index)}>
                  <IconButton variant="text" color="blue-gray">
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
            ))}
          </>
        )}
      </List>
      {data.length === 0 && (
        <>
          <ListItem ripple={true} className="w-full flex justify-center">
            <ListItemPrefix>
              <WarningIcon />
            </ListItemPrefix>

            <Typography variant="small" className="font-medium">
              No {title.toLowerCase()} available.
            </Typography>
          </ListItem>
        </>
      )}
    </>
  );
}

export const ListComponent = ({
  formData,
  data,
  title,
  setData,
  setFormData,
  targetKey,
}) => {
  return (
    <>
      <ListWithIcon
        formData={formData}
        data={data}
        title={title}
        setData={setData}
        setFormData={setFormData}
        targetKey={targetKey}
      />
    </>
  );
};
