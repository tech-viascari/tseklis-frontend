import { toast } from "sonner";
import axiosInstance from "../utils/axiosHelper";

export const handleLogout = async (logout, navigate) => {
  try {
    const response = await axiosInstance.post("/logout");

    if (response.status == 200) {
      logout();
      navigate();
      toast.success("Logout Successfully.");
    }
  } catch (error) {
    console.log(error);
  }
};
