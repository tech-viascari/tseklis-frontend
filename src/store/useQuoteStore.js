// store/useQuoteStore.js

import { create } from "zustand";

const ScopeOfWorkState = {
  task: "",
  sub_task: "",
  service_fee: "",
  oop_expenses: "",
};

const QuoteFormDataState = {
  recipient_company: "",
  recipient_address: "",
  recipient_email: "",
  recipient_name: "",
  service_type: "",
  billing_account: "Viascari, Inc.",
  scope_of_work: [],
  due_date: "",
  currency: "PHP",
};

const QuoteAttachmentsState = {
  signed_document_url: "",
  invoice_url: "",
  proof_of_payment_url: "",
};

const QuoteState = {
  quote_id: "",
  quote_number: "",
  quote_name: "",
  status: "",
  form_data: QuoteFormDataState,
  folder_id: "",
  google_doc_id: "",
  attachments: QuoteAttachmentsState,
  timestamps: [],
  created_at: "",
  updated_at: "",
};

// Create the Zustand store
const useQuoteStore = create((set) => ({
  quotes: [],
  quote: QuoteState,
  states: {
    quote: QuoteState,
    quote_form_data: QuoteFormDataState,
    attachments: QuoteAttachmentsState,
    scope_of_work: ScopeOfWorkState,
  },
  setQuotes: (payload) => set({ quotes: payload }),
  setQuote: (payload) => set({ quote: payload }),
}));

export default useQuoteStore;
