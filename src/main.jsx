import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <AuthProvider>
        {({ user, login, logout }) => (
          <App user={user} login={login} logout={logout} />
        )}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
