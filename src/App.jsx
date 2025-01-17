import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./pages/layouts/MainLayout";

const App = ({ user, login, logout }) => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<>Page not found.</>} />
    </Routes>
  );
};

export default App;
