// store/useRoleStore.js

import { create } from "zustand";

const OfficerInformationState = {
  officer_name: "",
  current_residence: "",
  nationality: "",
  incorporator: "Yes",
  board: "Member",
  gender: "Male",
  stockholder: "Yes",
  officer: "Corporate Secretary",
  executive_committee: "N/A",
  tax_identification_number: "",
};

const BusinessTypes = ["Sole", "Partnership", "Corporation"];
const ClientTypes = [
  "Viascari Group of Companies",
  "Computershare Clients",
  "External Clients",
];

const CompanyTypes = [
  "Non Stock",
  "Stock Domestic",
  "Stock Foreign Branch Office",
  "Stock Foreign Representative Office",
];

const LegalEntityState = {
  entity_id: "",
  business_type: "Corporation",
  client_type: "Viascari Group of Companies",
  company_name: "",
  company_address: "",
  type_of_company: "Non Stock",
  corporate_tin: "",
  sec_registration_number: "",
  official_email: "",
  alternative_email: "",
  official_contact_number: "",
  alternative_contact_number: "",
  company_logo: "",
  officer_information: [],
};

// Create the Zustand store
const useLegalEntities = create((set) => ({
  entities: [],
  entity: LegalEntityState,
  states: {
    entity: LegalEntityState,
    officer_information: OfficerInformationState,
    business_types: BusinessTypes,
    client_types: ClientTypes,
    company_types: CompanyTypes,
  },
  setEntities: (payload) => set({ entities: payload }),
  setEntity: (payload) => set({ entity: payload }),
}));

export default useLegalEntities;
