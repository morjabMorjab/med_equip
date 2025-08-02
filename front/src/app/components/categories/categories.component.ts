import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="categories">
      <h2>دسته‌بندی محصولات</h2>
      <div class="category-list">
        <div class="category-item" *ngFor="let category of categories">
          <div class="icon">{{ category.icon }}</div>
          <span>{{ category.name }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .categories {
      margin-bottom: 30px;
    }
    h2 {
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: #333;
    }
    .category-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100px;
      cursor: pointer;
    }
    .icon {
      width: 70px;
      height: 70px;
      background: #f8f9fa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-bottom: 10px;
      transition: all 0.3s ease;
    }
    .category-item:hover .icon {
      background: #ff6b35;
      color: white;
      transform: translateY(-5px);
    }
  `]
})
export class CategoriesComponent {
  categories = [
    { id: 1, name: 'غذاهای سنتی', icon: '🍲' },
    { id: 2, name: 'ماهی تازه', icon: '🐟' },
    { id: 3, name: 'انواع خرما', icon: '🌴' },
    { id: 4, name: 'ماهی کبابی', icon: '🔥' },
    { id: 5, name: 'صنایع دستی', icon: '🎨' },
    { id: 6, name: 'نوشیدنی‌ها', icon: '🥤' }
  ];
}
