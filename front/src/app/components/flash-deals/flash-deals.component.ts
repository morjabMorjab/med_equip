import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flash-deals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flash-deals">
      <div class="header">
        <h2>پیشنهادات ویژه</h2>
        <div class="timer">⏱️ پایان: ۲۴:۰۰:۰۰</div>
      </div>
      <div class="deals-container">
        <div class="deal-card" *ngFor="let deal of deals">
          <div class="discount-badge">{{ deal.discount }}%</div>
          <img [src]="deal.image" alt="Deal">
          <div class="deal-info">
            <h3>{{ deal.name }}</h3>
            <div class="prices">
              <span class="new-price">{{ deal.newPrice | number }} تومان</span>
              <span class="old-price">{{ deal.oldPrice | number }} تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .flash-deals {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 1.8rem;
      color: #333;
    }
    .timer {
      background: #ff4757;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: bold;
    }
    .deals-container {
      display: flex;
      gap: auto;
      overflow-x: auto;
      padding-bottom: 10px;
    }
    .deal-card {
      position: relative;
      min-width: 200px;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      margin-right: 15px;
    }
    .discount-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #ff6b35;
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: bold;
      z-index: 2;
    }
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .deal-info {
      padding: 15px;
    }
    h3 {
      font-size: 1.1rem;
      margin: 0 0 10px 0;
    }
    .prices {
      display: flex;
      gap: 10px;
    }
    .new-price {
      font-weight: bold;
      color: #27ae60;
    }
    .old-price {
      text-decoration: line-through;
      color: #999;
    }
  `]
})
export class FlashDealsComponent {
  deals = [
    { 
      id: 1, 
      name: 'قلیه ماهی جنوبی', 
      discount: 20, 
      oldPrice: 120000, 
      newPrice: 96000,
      image: '/assets/images/fish-curry.jpg'
    },
    { 
      id: 2, 
      name: 'خرما استعمران', 
      discount: 15, 
      oldPrice: 80000, 
      newPrice: 68000,
      image: '/assets/images/dates.jpg'
    },
    { 
      id: 3, 
      name: 'ماهی کباب شده', 
      discount: 30, 
      oldPrice: 150000, 
      newPrice: 105000,
      image: '/assets/images/grilled-fish.jpg'
    },
    { 
      id: 4, 
      name: 'سمک مشوی', 
      discount: 25, 
      oldPrice: 100000, 
      newPrice: 75000,
      image: '/assets/images/samak-mashwi.jpg'
    }
  ];
}
