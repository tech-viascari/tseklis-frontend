import React from "react";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import MainLayout from "./pages/layouts/MainLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import QuotesPage from "./pages/quotes/QuotesPage";
import AddQuotesPage from "./pages/quotes/AddQuotesPage";
import { DirtyProvider } from "./providers/DirtyProvider";
import PageNotFoundComponent from "./components/PageNotFoundComponent";
import EntityEnrollment from "./pages/company_enrollment/EntityEnrollment";
import AddEntityEnrollmentPage from "./pages/company_enrollment/AddEntityEnrollmentPage";
import ViewQuotePage from "./pages/quotes/ViewQuotePage";
import UpdateQuotesPage from "./pages/quotes/UpdateQuotesPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UsersPage from "./pages/user_management/users/UsersPage";
import RolesPage from "./pages/user_management/roles/RolesPage";
import PermissionsPage from "./pages/user_management/permissions/PermissionsPage";
import AddUsersPage from "./pages/user_management/users/AddUsersPage";
import AddPermissionsPage from "./pages/user_management/permissions/AddPermissionsPage";
import ViewPermissionPage from "./pages/user_management/permissions/ViewPermissionPage";
import UpdatePermissionPage from "./pages/user_management/permissions/UpdatePermissionPage";
import AddRolesPage from "./pages/user_management/roles/AddRolesPage";
import ViewRolePage from "./pages/user_management/roles/ViewRolePage";
import UpdateRolePage from "./pages/user_management/roles/UpdateRolePage";
import ViewUsersPage from "./pages/user_management/users/ViewUsersPage";
import UpdateUsersPage from "./pages/user_management/users/UpdateUsersPage";


const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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

          <Route path="/entity-enrollment" element={<EntityEnrollment />} />
          <Route path="/entity-enrollment/add" element={<AddEntityEnrollmentPage />} />

            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/add-new" element={<AddUsersPage />} />
            <Route path="/users/view/:user_id" element={<ViewUsersPage />} />
            <Route
              path="/users/update/:user_id"
              element={<UpdateUsersPage />}
            />

            <Route path="/roles" element={<RolesPage />} />
            <Route path="/roles/add-new" element={<AddRolesPage />} />
            <Route path="/roles/view/:role_id" element={<ViewRolePage />} />
            <Route path="/roles/update/:role_id" element={<UpdateRolePage />} />

            <Route path="/permissions" element={<PermissionsPage />} />
            <Route
              path="/permissions/add-new"
              element={<AddPermissionsPage />}
            />
            <Route
              path="/permissions/view/:permission_id"
              element={<ViewPermissionPage />}
            />
            <Route
              path="/permissions/update/:permission_id"
              element={<UpdatePermissionPage />}
            />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<PageNotFoundComponent />} />
        </Routes>
      </DirtyProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
