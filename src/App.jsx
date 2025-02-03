import React from "react";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import MainLayout from "./pages/layouts/MainLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import QuotesPage from "./pages/quotes/QuotesPage";
import UsersPage from "./pages/user_management/UsersPage";
import RolesPage from "./pages/user_management/RolesPage";
import PermissionsPage from "./pages/user_management/PermissionsPage";
import AddQuotesPage from "./pages/quotes/AddQuotesPage";
import { DirtyProvider } from "./providers/DirtyProvider";
import PageNotFoundComponent from "./components/PageNotFoundComponent";
import ViewQuotePage from "./pages/quotes/ViewQuotePage";
import UpdateQuotesPage from "./pages/quotes/UpdateQuotesPage";

const App = () => {
  return (
    <DirtyProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/quotes/add-new" element={<AddQuotesPage />} />
          <Route path="/quotes/view/:quote_id" element={<ViewQuotePage />} />
          <Route
            path="/quotes/update/:quote_id"
            element={<UpdateQuotesPage />}
          />

          <Route path="/users" element={<UsersPage />} />

          <Route path="/roles" element={<RolesPage />} />

          <Route path="/permissions" element={<PermissionsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<PageNotFoundComponent />} />
      </Routes>
    </DirtyProvider>
  );
};

export default App;
