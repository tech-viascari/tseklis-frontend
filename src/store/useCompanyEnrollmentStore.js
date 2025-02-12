import { create } from "zustand";

const BasicInformationState = {
  business_type: "",
  client_type: "",
  company_name: "",
  company_address: "",
  type_of_company: "",
  corporate_tin: "",
  sec_registration_number: "",
  official_email: "",
  alternative_email: "",
  official_contact_number: "",
  alternative_contact_number: "",
  company_logo: "",
};

const OfficerInformationState = {
  officer_name: "",
  current_residence: "",
  nationality: "",
  incorporator: "",
  board: "",
  gender: "",
  stock_holder: "",
  officer: "",
  executive_committee: "",
  tax_identification_number: "",
};

const CompanyEnrollmentState = {
  basic_information: BasicInformationState,
  officer_information: [],
};

// Create the Zustand store
const useCompanyEnrollmentStore = create((set) => ({
  companies: [],
  company: CompanyEnrollmentState,
  states: {
    company: CompanyEnrollmentState,
    basic_information: BasicInformationState,
    officer_information: OfficerInformationState,
  },
  setCompanies: (payload) => set({ companies: payload }),
  setCompany: (payload) => set({ company: payload }),
}));

export default useCompanyEnrollmentStore;
