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
import LegalEntitiesPage from "./pages/legal_entities/LegalEntitiesPage";
import AddLegalEntitiesPage from "./pages/legal_entities/AddLegalEntitiesPage";
import LegalEntityMainLayout from "./pages/layouts/legal_entity_layouts/LegalEntityMainLayout";
import EntityDashboardPage from "./pages/legal_entities/legal_entity/EntityDashboardPage";
import EntityGISPage from "./pages/legal_entities/legal_entity/EntityGISPage";
import EntityProfilePage from "./pages/legal_entities/legal_entity/EntityProfilePage";
import EntityDocumentDraftingPage from "./pages/legal_entities/legal_entity/EntityDocumentDraftingPage";
import NoticeOfMeetingPage from "./pages/legal_entities/legal_entity/board_meetings/NoticeOfMeetingPage";
import MinutesOfMeetingPage from "./pages/legal_entities/legal_entity/board_meetings/MinutesOfMeetingPage";
import SecretaryCertificatePage from "./pages/legal_entities/legal_entity/board_meetings/SecretaryCertificatePage";
import BoardResolutionPage from "./pages/legal_entities/legal_entity/board_meetings/BoardResolutionPage";
import TreasurerCertificatePage from "./pages/legal_entities/legal_entity/board_meetings/TreasurerCertificatePage";
import AllWorkflow from "./pages/project_management/AllWorkflow";
import ViewWorkflow from "./pages/project_management/ViewWorkflow";
import AddWorkflow from "./pages/project_management/AddWorkflow";
import AddDocumentDraftingPage from "./pages/legal_entities/legal_entity/document_drafting/AddDocumentDraftingPage";
import { UpdateLegalEntitiesPage } from "./pages/legal_entities/UpdateLegalEntitiesPage";
import AddGISPage from "./pages/legal_entities/legal_entity/gis/AddGISPage";
import AddProjectsPage from "./pages/project_management/AddProjects";
import ViewGISPage from "./pages/legal_entities/legal_entity/gis/ViewGISPage";
import UpdateGISPage from "./pages/legal_entities/legal_entity/gis/UpdateGISPage";
import ViewDocumentDraftingPage from "./pages/legal_entities/legal_entity/document_drafting/ViewDocumentDraftingPage";
import UpdateDocumentDraftingPage from "./pages/legal_entities/legal_entity/document_drafting/UpdateDocumentDraftingPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import AssignedProjectsPage from "./pages/projects/AssignedProjectsPage";
import ViewProjectPage from "./pages/projects/ViewProjectPage";

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

            {/* My routes starts from entity-enrollment - Anthony */}
            <Route path="/entity-enrollment" element={<EntityEnrollment />} />
            <Route
              path="/entity-enrollment/add"
              element={<AddEntityEnrollmentPage />}
            />
            <Route
              path="/entity-enrollment/view/:entity_id"
              element={<AddEntityEnrollmentPage />}
            />

            <Route path="/legal-entities" element={<LegalEntitiesPage />} />
            <Route
              path="/legal-entities/add-new"
              element={<AddLegalEntitiesPage />}
            />
            <Route
              path="/legal-entities/update/:entity_id"
              element={<UpdateLegalEntitiesPage />}
            />

            {/* project management X workflow X task X subtask */}
            <Route path="/workflow" element={<AllWorkflow />} />
            <Route path="/workflow/addworkflow" element={<AddWorkflow />} />
            <Route path="/project/add-project" element={<AddProjectsPage />} />
            <Route
              path="/workflow/view/:workflow_id"
              element={<ViewWorkflow />}
            />
           
            <Route
              path="/projects-assigned-to-you"
              element={<AssignedProjectsPage />}
            />
             <Route path="/projects" element={<ProjectsPage />} />
             <Route path="/projects/view/:project-id" element={<ViewProjectPage />} />

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
              path="/permissions/view/:permission_id/"
              element={<ViewPermissionPage />}
            />
            <Route
              path="/permissions/update/:permission_id"
              element={<UpdatePermissionPage />}
            />
          </Route>

          {/* dito legal entities - Anthony */}
          <Route element={<LegalEntityMainLayout />}>
            <Route
              path="/legal-entities/v/:entity_id"
              element={<EntityDashboardPage />}
            />

            <Route
              path="/legal-entities/v/:entity_id/entity-profile"
              element={<EntityProfilePage />}
            />

            <Route
              path="/legal-entities/v/:entity_id/gis-tracker"
              element={<EntityGISPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/gis-tracker/add-new"
              element={<AddGISPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/gis-tracker/view/:gis_document_id"
              element={<ViewGISPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/gis-tracker/update/:gis_document_id"
              element={<UpdateGISPage />}
            />

            <Route
              path="/legal-entities/v/:entity_id/document-drafting"
              element={<EntityDocumentDraftingPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/document-drafting/add-new"
              element={<AddDocumentDraftingPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/document-drafting/view/:document_id"
              element={<ViewDocumentDraftingPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/document-drafting/update/:document_id"
              element={<UpdateDocumentDraftingPage />}
            />

            {/* <Route
              path="/legal-entities/v/:entity_id/notice-of-meeting"
              element={<NoticeOfMeetingPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/minutes-of-meeting"
              element={<MinutesOfMeetingPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/board-resolutions"
              element={<BoardResolutionPage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/secretary-certificate"
              element={<SecretaryCertificatePage />}
            />
            <Route
              path="/legal-entities/v/:entity_id/treasurer-certificate"
              element={<TreasurerCertificatePage />}
            /> */}
          </Route>

          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<PageNotFoundComponent />} />
        </Routes>
      </DirtyProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
