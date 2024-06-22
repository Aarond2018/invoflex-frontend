export interface LoginInputs {
  email: string;
  password: string;
}

export interface SignUpInputs {
  name: string;
  email: string;
  password: string;
  terms?: boolean;
}

export interface OnboardInputs {
  businessName: string;
  address: string;
  phone: string;
  logo: File[];
}

export interface SignUpResponseData {
  email: string;
  id: string;
  isVerified: boolean;
}

export interface LogInResponseData {
  email: string;
  id: string;
  isVerified: boolean;
}

