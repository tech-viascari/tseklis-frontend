import React, { useEffect, useState } from "react";
import InputComponent from "../../components/InputComponent";
import logo from "../../assets/logos/secondary_logo.svg";
import ButtonComponent from "../../components/ButtonComponent";
import axiosInstance from "../../utils/axiosHelper.js";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/useAuthStore.js";
import { googleIconSVG } from "../../components/GetIcons.jsx";

const LoginPage = () => {
  const { login } = useAuthStore();
  const formState = { email: "", password: "" };
  const [formData, setFormData] = useState(formState);
  const [errors, setErrors] = useState(formState);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (isFormValid()) {
      try {
        const response = await axiosInstance.post("/authenticate", formData);

        if (response.status === 200) {
          login(response.data.payload);
          toast.success("Login Successfully.");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to login. Please try again.");
      }
    }
  };

  const handleOnChange = (e, error_message) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const isFormValid = () => {
    let newErrors = {};

    if (formData.email === "") {
      newErrors.email = "Email is required.";
    } else {
      // Email regex (basic format validation)
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (formData.password === "") {
      newErrors.password = "Password is required.";
    } else {
      // Password regex (min 8 characters, 1 uppercase, 1 lowercase, 1 number)
      // const passwordRegex =
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      // if (!passwordRegex.test(formData.password)) {
      //   newErrors.password =
      //     "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.";
      // }
    }

    if (Object.keys(newErrors).length != 0) {
      setErrors(newErrors);
    }

    return Object.keys(newErrors).length == 0;
  };

  const formComponent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <InputComponent
        label="Work Email"
        name="email"
        type="email"
        value={formData.email}
        error_message={errors.email}
        required={true}
        labelClass="font-medium"
        onChange={(e) => {
          handleOnChange(e, "Email is required.");
        }}
      />
      <InputComponent
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        error_message={errors.password}
        required={true}
        labelClass="font-medium"
        onChange={(e) => {
          handleOnChange(e, "Password is required.");
        }}
      />
      <ButtonComponent
        variant="filled"
        type="submit"
        className="font-semibold text-secondary bg-primary"
      >
        Login
      </ButtonComponent>
    </form>
  );

  const googleAuthComponent = (
    <>
      <ButtonComponent
        className="w-full normal-case text-dark"
        variant="outlined"
        onClick={() => toast.error("Google auth is under development.")}
      >
        <div className="flex flex-row gap-1 items-center justify-center">
          {googleIconSVG}
          <p className="font-semibold text-[12px]">Continue with Google</p>
        </div>
      </ButtonComponent>
    </>
  );

  const dividerComponent = (
    <div className="w-full relative py-2">
      <div className="border-light relative w-full border-[.5px]"></div>
      <div className="absolute top-1/2 text-center w-full -mt-[8px] flex flex-col items-center">
        <p className="bg-white flex flex-col w-7 text-[10px] text-dark font-semibold">
          or
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center bg-[#F5F7F9] h-screen">
        <div className="flex flex-col gap-4 w-full sm:w-96 bg-white p-8 rounded-xl items-center shadow-md">
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className="aspect-square w-2/5" />
          </div>

          {formComponent}

          {dividerComponent}

          {googleAuthComponent}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
