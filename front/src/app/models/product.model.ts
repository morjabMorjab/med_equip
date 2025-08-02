export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  stock_quantity: number;
  user_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  user?: { id: number; name: string; email: string; }; 
  category?: { id: number; name: string; };
}
