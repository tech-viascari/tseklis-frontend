import React, { useLayoutEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import axiosInstance from "../utils/axiosHelper";
import { useNavigate, useParams } from "react-router";

const AuthProvider = ({ children }) => {
  const { user, login, logout } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const loadingComponent = (
    <div className="h-screen flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 animate-spin"
      >
        <path
          fillRule="evenodd"
          d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  useLayoutEffect(() => {
    const paths = window.location.pathname.split("/");
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("auth/check");
        if (response.status === 200) {
          login(response.data.payload);
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    if (paths[1] != "login") {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      {/* Pass down the auth state and actions as props */}
      {isLoading ? loadingComponent : children({ user, login, logout })}
    </div>
  );
};

export default AuthProvider;
