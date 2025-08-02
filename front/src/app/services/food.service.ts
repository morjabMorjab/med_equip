import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// ****** این بخش اصلاح شده است ******
// 1. وارد کردن تایپ‌ها برای استفاده در همین فایل
import type { Food } from '../models/food.model';
// 2. صادر کردن تایپ‌ها برای استفاده توسط کامپوننت‌های دیگر
export type { Food, Chef } from '../models/food.model'; 

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/v1/foods';

  /**
   * متد اصلی برای دریافت محصولات به صورت صفحه‌بندی شده
   */
  getFoods(page: number = 1): Observable<any> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }
  
  /**
   * متد کمکی برای دریافت فقط لیست محصولات صفحه اول
   */
  getFeaturedFoods(): Observable<Food[]> {
    return this.getFoods(1).pipe(
      map(response => response.data)
    );
  }
}