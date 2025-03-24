// store/useGISDocumentStore.js

import { create } from "zustand";

const DocumentTypes = [
  "Certificate of Gross Sales/Receipts",
  // "SPA - Business Renewal",
  // "SECCERT - Waiver of Preemptive Rights",
  // "SECCERT - No Dispute",
  // "SECCERT - List of Stockholders",
  // "SECCERT - For Authorization",
  // "Affidavit of Loss",
  // "Affidavit of Non-Operation",
  // "Cover Sheet for Audited Financial Statements",
  // "SMR - Statement of Management's Responsibility for Financial Statements",
];

export const appointeeState = {
  name: "",
  id_no: "",
  date_place_issued: "",
};

const DocumentDataState = {
  type: "Certificate of Gross Sales/Receipts",
  corporate_name: "",
  corporate_tin: "",
  office_address: "",

  //CGR
  total_revenue: "",
  date_from: `${new Date().getFullYear()}-01-01`,
  date_to: `${new Date().getFullYear()}-12-31`,
  year: `${new Date().getFullYear()}`,
  revenue_q1: "",
  revenue_q2: "",
  revenue_q3: "",
  revenue_q4: "",

  //Preemptive Rights
  meeting_date: "",
  meeting_place: "",
  from: "",
  from_divided_into: "",
  from_par_value: "",
  to: "",
  to_divided_into: "",
  to_par_value: "",

  //List of Stockholders
  as_of: "",
  stockholders_data: [],

  //For Authorization
  // meeting_date: "",
  resolutions: [
    "RESOLVED, as it resolved that the Board of Directors hereby appoint {{name}}, {{position}} as the Point of Contact to transact, apply, submit, receive, sign for on behalf of the company in all Converge related transactions.",
    "RESOLVED FURTHER, to authorize, negotiate, secure, claim and receive from the above stated agency any and all documents related to the above mentioned power. ",
    "RESOLVED FINALLY, to authorize the above-named person/s to perform such other acts and to execute and sign any and all documents necessary to the accomplishment of the above mentioned authority.",
  ],

  //Signatory
  officer_name: "",
  officer_position: "",
  officer_nationality: "",

  //Corporate Secretary
  corp_sec: "",
  corp_sec_address: "",

  //Affidavit of Loss
  list_items: [
    "I am the registered Corporate Secretary of {{corporate_name}}, a company duly registered with the Security and Exchange Commissions under SEC Registration No. {{sec_registration_number}} and with TIN {{corporate_tin}}, with principal office address at {{complete_principal_office_address}};",
    "That the said loss was discovered on or about {{last_dicovered_date}} and despite diligent efforts, we are unable to locate or recover the said {{missing_items}};",
    "I am executing this affidavit to attest to the truth of the foregoing in order to secure a certified true copy of the documents required for updating the Corporation’s head office address from {{old_head_office}} to {{new_head_office}}.",
  ],

  appointees: [appointeeState],
};

const StatusesState = {
  drafted: "Drafted",
  pending_for_approval: "Pending for Approval",
  approved: "Approved",
  routed_for_signature: "Routed for Signature",
  notarized: "Notarized",
  filed_with_sec: "Filed with SEC",
  completed: "Completed",
};

const TimestampState = {
  doc_timestamp_id: "",
  document_id: "",
  status: "",
  modified_by: "",
  remarks: "",
  datetime: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
};

const AttachmentState = {
  google_doc_id: "",
  final_doc: "",
};

const DocumentState = {
  document_id: "",
  entity_id: "",
  document_name: "",
  document_data: DocumentDataState,
  attachments: AttachmentState,
  timestamps: [],
  created_at: new Date(),
  updated_at: new Date(),
};

// Create the Zustand store
const useDocumentDraftingStore = create((set) => ({
  documents: [],
  document: DocumentState,
  states: {
    DocumentState: DocumentState,
    TimestampState: TimestampState,
    AttachmentState: AttachmentState,
    StatusesState: StatusesState,
    DocumentTypes: DocumentTypes,
  },
  document_state: {
    appointeeState: appointeeState,
  },
  setDocuments: (payload) => set({ documents: payload }),
  setDocument: (payload) => set({ document: payload }),
}));

export default useDocumentDraftingStore;
