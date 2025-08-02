import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartResponse, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/v1/cart';
  private cartItemsSubject = new BehaviorSubject<number>(0);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateCartCount();
  }

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.apiUrl);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, {
      product_id: productId,
      quantity: quantity
    });
  }

  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, {
      quantity: quantity
    });
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>(this.apiUrl);
  }

  updateCartCount(): void {
    this.getCart().subscribe(response => {
      const totalItems = response.cart.reduce((sum, group) => 
        sum + group.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
      this.cartItemsSubject.next(totalItems);
    });
  }
}
