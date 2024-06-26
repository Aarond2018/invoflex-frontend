export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string | undefined;
  address: string;
  businessName: string;
  clients: string[];
  createdAt: string;
  invoices: string[];
  isVerified: boolean;
  logo: string;
  updatedAt: string;
  __v: number;
}