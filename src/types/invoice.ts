export interface InvoiceItem {
    _id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    details?: string;
  }
  
  export interface TotalItem {
    _id: string;
    label: string;
    value: string;
  }
  
  export interface Invoice {
    _id: string;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    items: InvoiceItem[];
    totals: TotalItem[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ApiResponse {
    message: string;
    count: number;
    data: Invoice[];
  }
  
  export type RequestState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: Invoice[] }
    | { status: 'error'; error: string };