import { create } from "zustand";

const OfficerInformationState = {
  officer_name: "",
  current_residence: "",
  nationality: "",
  incorporator: "Y",
  board: "N/A",
  gender: "M",
  stockholder: "Yes",
  officer: "Corporate Secretary",
  executive_committee: "N/A",
  tax_identification_number: "",
};
// business types are composed of Sole, Partnership, and Corporation
const BusinessTypes = ["Corporation"];
const ClientTypes = [
  "Viascari Group of Companies",
  "Computershare Clients",
  "External Clients",
];

const CompanyTypes = [
  "Domestic - Stock",
  "Domestic - Non Stock",
  "Foreign Branch Office",
  "Foreign Representative Office",
  "Foreign Regional Area Headquarters",
  "Foreign Regional Operating Headquarters",
];

const LegalEntityDetailsState = {

  //corporation muna ito
  business_type: "Corporation",
  client_type: "Viascari Group of Companies",
  company_name: "",
  company_address: "",
  type_of_company: "Domestic - Stock",
  corporate_tin: "",
  sec_registration_number: "",
  official_email: "",
  alternative_email: "",
  official_contact_number: "",
  alternative_contact_number: "",
  officer_information: [],
};

const GdriveFolderState = {
  root_folder_id: "",
  final_docs_id: "",
  sec_cert: "",
  articles_of_incorporation: "",
  by_laws: "",
  bir_cor: "",
  lgu_business_permit: "",
}


const LegalEntityState = {
  entity_id: "",
  entity_details: LegalEntityDetailsState,
  entity_logo: "",
  status: "Active",
  gdrive_folder: GdriveFolderState, 
  created_at: "",
  updated_at: "",
};

// Create the Zustand store
const useLegalEntities = create((set) => ({
  entities: [],
  viascari_group_of_companies: [],
  computershare_clients: [],
  external_clients: [],
  entity: LegalEntityState,
  states: {
    entity: LegalEntityState,
    entity_details: LegalEntityDetailsState,
    officer_information: OfficerInformationState,
    business_types: BusinessTypes,
    client_types: ClientTypes,
    company_types: CompanyTypes,
  },
  setEntities: (payload) => set({ entities: payload }),
  setEntity: (payload) => set({ entity: payload }),
  filterEntities: (payload) => {
    let viascari_group_of_companies = payload.filter(
      (entity) => entity.entity_details.client_type === "Viascari Group of Companies"
    );

    let computershare_clients = payload.filter(
      (entity) => entity.entity_details.client_type === "Computershare Clients"
    );

    let external_clients = payload.filter(
      (entity) => entity.entity_details.client_type === "External Clients"
    );

    return set({
      viascari_group_of_companies,
      computershare_clients,
      external_clients,
    });
  },
}));

export default useLegalEntities;