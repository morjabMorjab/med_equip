import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private apiService: ApiService) {}

  // در آینده این تابع به API واقعی وصل خواهد شد
  // در حال حاضر داده‌های آزمایشی برمی‌گرداند
  getCategories(): Observable<Category[]> {
    const mockCategories: Category[] = [
      { id: 1, name: 'غذای سنتی', slug: 'traditional-food', icon: 'assets/icons/food.svg' },
      { id: 2, name: 'خرما و رطب', slug: 'dates', icon: 'assets/icons/dates.svg' },
      { id: 3, name: 'ماهی و دریایی', slug: 'seafood', icon: 'assets/icons/fish.svg' },
      { id: 4, name: 'کالای ته لنجی', slug: 'imported-goods', icon: 'assets/icons/boat.svg' },
      { id: 5, name: 'صنایع دستی', slug: 'handicrafts', icon: 'assets/icons/crafts.svg' },
    ];
    // return this.apiService.get('categories');
    return of(mockCategories);
  }
}
