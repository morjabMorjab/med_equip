export interface Seller {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
  created_at: string;
  products?: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
  created_at: string;
}