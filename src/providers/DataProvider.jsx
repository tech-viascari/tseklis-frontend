import React, { useLayoutEffect, useState } from "react";
import axiosInstance from "../utils/axiosHelper";
import LoadingComponent from "../components/LoadingComponent";

const DataProvider = ({ children, setData, tableName }) => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(tableName);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Pass down the auth state and actions as props */}
      {isLoading ? <LoadingComponent /> : children}
    </div>
  );
};

export default DataProvider;
