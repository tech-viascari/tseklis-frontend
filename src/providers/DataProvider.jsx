import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosHelper";
import LoadingComponent from "../components/LoadingComponent";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const DataProvider = ({ children, setData, tableName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(tableName);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        if (error.status == 401) {
          navigate("/login");
          toast.error("Session Expired");
        }
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
