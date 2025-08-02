export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'seller';
  phone_number?: string;
  address?: string;
}
