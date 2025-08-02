export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  seller_id: number;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  payment_method: 'cash' | 'card' | 'wallet';
  payment_status: 'pending' | 'paid' | 'failed';
  delivery_address: string;
  delivery_lat: number;
  delivery_lng: number;
  notes?: string;
  confirmed_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  seller?: Seller;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
  product?: Product;
}
