import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Seller } from '../models/seller.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  getSellerDetails(sellerId: number): Observable<{seller: Seller, products: any[]}> {
    return this.http.get<{seller: Seller, products: any[]}>(`${environment.apiUrl}/sellers/${sellerId}`);
  }
}