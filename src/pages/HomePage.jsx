import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import ButtonComponent from "../components/ButtonComponent";
import { toast } from "sonner";
import axiosInstance from "../utils/axiosHelper";
import useAuthStore from "../store/useAuthStore";

const HomePage = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();


  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/logout");
      if (response.status === 200) {
        navigate("/login");
        toast.success("Logout successfully.");
      }
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <>
      <div>Hi, {user?.email}</div>

      <ButtonComponent
        text="Logout"
        label="Logout"
        onClick={handleLogout}
      ></ButtonComponent>
    </>
  );
};

export default HomePage;
