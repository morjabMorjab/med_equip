import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

export interface CreateOrderRequest {
  seller_id: number;
  delivery_address: string;
  delivery_lat: number;
  delivery_lng: number;
  payment_method: 'cash' | 'card' | 'wallet';
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/v1/orders';

  constructor(private http: HttpClient) {}

  getOrders(page: number = 1, perPage: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  createOrder(orderData: CreateOrderRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  cancelOrder(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
