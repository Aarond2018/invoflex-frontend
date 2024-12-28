import { User } from "./user";

export interface Invoice {
  _id: string;
  createdAt: string;
  createdBy: User | string;
  description: string;
  dueDate: string;
  items: InvoiceItem[];
  note?: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
  taxApplied: number;
  totalAmount: number;
  updatedAt: string;
  __v: number;
  addressedTo: Client | string; 
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  _id: string;
}

export interface Client {
  _id: string;
  name: string;
  email: string;
  address: string;
  user: string;
  __v: number;
}

export interface ClientInputs {
  name: string;
  email: string;
  address: string;
}

export interface UserDashboardData {
  totalAmount: number;
  totalClients: number;
  totalInvoices: number;
  recentInvoices: Invoice[];
  clients: Client[];
  // invoicesAgg: Array<{
  //   _id: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
  //   count: number;
  //   total: number;
  // }>
  invoicesAgg: AggDataItem[];
}

export interface AggDataItem {
  count: number;
  total: number;
  _id: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
}