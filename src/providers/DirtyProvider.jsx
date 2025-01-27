import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const DirtyContext = createContext();

// Create the provider component
export const DirtyProvider = ({ children }) => {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message; // For most browsers
        return message; // For some older versions
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <DirtyContext.Provider value={{ isDirty, setIsDirty }}>
        
      {children}
    </DirtyContext.Provider>
  );
};

// Custom hook to use the DirtyContext
export const useDirtyContext = () => useContext(DirtyContext);
