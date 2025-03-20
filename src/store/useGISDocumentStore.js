// store/useGISDocumentStore.js

import { create } from "zustand";

const authCapitalStockState = {
  type_of_shares: "COMMON",
  number_of_shares: 0,
  par_or_stated_value: 1,
  amount: 0,
};

const filipinoSubscribeCapitalState = {
  number_of_stock_holders: 0,
  types_of_shares: "",
  number_of_shares: 0,
  number_of_shares_in_hands: "",
  par_or_stated_value: 0,
  amount: 0,
  percent_of_ownership: "",
};

const foreignSubscribeCapitalState = {
  nationality: "",
  number_of_stock_holders: "",
  types_of_shares: "",
  number_of_shares: "",
  number_of_shares_in_hands: "",
  par_or_stated_value: "",
  amount: "",
  percent_of_ownership: "",
};

const filipinoPaidUpCapitalState = {
  number_of_stock_holders: "",
  types_of_shares: "",
  number_of_shares: "",
  par_or_stated_value: "",
  amount: "",
  percent_of_ownership: "",
};

const foreignPaidUpCapitalState = {
  nationality: "",
  number_of_stock_holders: "",
  types_of_shares: "",
  number_of_shares: "",
  par_or_stated_value: "",
  amount: "",
  percent_of_ownership: "",
};

const subscribeCapitalState = {
  filipino: [],
  foreign: [],
  sub_total_number_of_shares_filipino: 0,
  sub_total_amount_filipino: 0,
  sub_total_ownership_filipino: 0,
  sub_total_number_of_shares_foreign: 0,
  sub_total_amount_foreign: 0,
  sub_total_ownership_foreign: 0,
  total_number_of_shares: 0,
  total_amount: 0,
  total_percent_of_ownership: 0,
  percentage_of_foreign_equity: 0,
};

const paidUpCapitalState = {
  filipino: [],
  foreign: [],
  sub_total_number_of_shares_filipino: 0,
  sub_total_amount_filipino: 0,
  sub_total_ownership_filipino: 0,
  sub_total_number_of_shares_foreign: 0,
  sub_total_amount_foreign: 0,
  sub_total_ownership_foreign: 0,
  total_number_of_shares: 0,
  total_amount: 0,
  total_percent_of_ownership: 0,
};

const directorsOrOfficersState = {
  name: "",
  current_residential_address: "",
  nationality: "",
  incorporator: "",
  board: "",
  gender: "",
  stock_holder: "",
  officer: "",
  executive_committee: "",
  tax_id_number: "",
  individuals_id: "",
};

const beneficialOwnershipDeclarationState = {
  complete_name: "",
  specific_residential_address: "",
  nationality: "",
  date_of_birth: "",
  tax_id_number: "",
  percent_of_ownership: "",
  type_of_beneficial_owner: "",
  category_of_beneficial_ownership: "",
};

const stockholdersInformationState = {
  name: "",
  nationality: "",
  current_residential_address: "",
  type: "COMMON",
  number: "",
  amount: "",
  percent_of_ownership: "",
  amount_paid: "",
  tax_id_number: "",
  total_number: 0,
  total_amount: 0,
};

const affiliationsState = {
  name: "N/A",
  sec_no: "N/A",
  address: "N/A",
};

const GISDocumentDataState = {
  is_amended: false,
  is_special_meeting: false,
  year: "",
  date_registered: "",
  official_email_address: "",
  corporate_name: "",
  fiscal_year_end: "",
  alternate_email_address: "",
  business_or_trade_name: "",
  corporate_tin: "",
  official_mobile_number: "",
  sec_registration_number: "",
  website_url_address: "N/A",
  name_of_external_auditor: "",
  date_of_annual_meeting: "",
  fax_number: "N/A",
  sec_accreditation_number: "",
  actual_date_of_annual_meeting: "",
  alternate_phone_number: "",
  industry_classification: "",
  complete_principal_office_address: "",
  telephone_number: "",
  geographical_code: "N/A",
  nature_of_business: "",
  primary_purpose: "",
  is_under_AMLA: false,
  has_complied_with_the_requirements: false,
  auth_capital_stock: {
    capital_stocks: [],
    total_number_of_shares: 0,
    total_amount: 0,
  },
  subscribe_capital: subscribeCapitalState,
  paid_up_capital: paidUpCapitalState,
  directors_or_officers: [],
  total_number_of_stockholders: 0,
  number_of_stockholders_with_more_shares_each: 0,
  total_assets_based_on_latest_audited: "",
  stock_holders_information: {
    information: [],
    total_amount: 0,
    total_percent_of_ownership: 0,
  },
  corporate_secretary: "",
  beneficial_ownership_declaration: [],
  affiliations: {
    parent: affiliationsState,
    subsidiary_affiliate: [affiliationsState],
  },
};

const GISStatusesState = {
  drafted: "Drafted",
  pending_for_approval: "Pending for Approval",
  approved: "Approved",
  routed_for_signature: "Routed for Signature",
  notarized: "Notarized",
  filed_with_sec: "Filed with SEC",
  completed: "Completed",
};

const GISTimestampState = {
  gis_timestamp_id: "",
  gis_document_id: "",
  status: "",
  modified_by: "",
  remarks: "",
  datetime: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
};

const GISAttachmentState = {
  google_sheets: "",
  final_docs: "",
};

const GISDocumentState = {
  gis_document_id: "",
  entity_id: "",
  gis_document_name: "",
  document_data: GISDocumentDataState,
  attachments: GISAttachmentState,
  date_received: null,
  timestamps: [],
  created_at: new Date(),
  updated_at: new Date(),
};

// Create the Zustand store
const useGISDocumentStore = create((set) => ({
  GISDocuments: [],
  GISDocument: GISDocumentState,
  states: {
    GISDocument: GISDocumentState,
    GISTimestamp: GISTimestampState,
    GISAttachment: GISAttachmentState,
    GISDocumentData: GISDocumentDataState,
    GISStatuses: GISStatusesState,
  },
  document_state: {
    affiliations: affiliationsState,
    stockholdersInformation: stockholdersInformationState,
    beneficialOwnershipDeclaration: beneficialOwnershipDeclarationState,
    directorsOrOfficers: directorsOrOfficersState,
    paidUpCapitalState: paidUpCapitalState,
    subscribeCapital: subscribeCapitalState,
    foreignPaidUpCapital: foreignPaidUpCapitalState,
    filipinoPaidUpCapital: filipinoPaidUpCapitalState,
    foreignSubscribeCapital: foreignSubscribeCapitalState,
    filipinoSubscribeCapital: filipinoSubscribeCapitalState,
    authCapitalStock: authCapitalStockState,
  },
  setGISDocuments: (payload) => set({ GISDocuments: payload }),
  setGISDocument: (payload) => set({ GISDocument: payload }),
}));

export default useGISDocumentStore;
