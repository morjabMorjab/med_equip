import { Product } from './product.model';
import { Seller } from './seller.model';

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  seller_id: number;
  quantity: number;
  price: number;
  total: number;
  created_at: string;
  updated_at: string;
  product: Product;
  seller: Seller;
}

export interface CartGroup {
  seller: Seller;
  items: CartItem[];
  subtotal: number;
}

export interface CartResponse {
  cart: CartGroup[];
  total: number;
}
