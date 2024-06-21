export interface LoginInputs {
  name: string;
  email: string;
  password: string;
}

export interface SignUpInputs {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface OnboardInputs {
  businessName: string;
  address: string;
  phone: string;
  logo: File[];
}

export interface SignUpResponse {
  
}