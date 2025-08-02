import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-banners',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-banner">
      <h1>به بازار آشپزهای خوزستان خوش آمدید!</h1>
      <p>بهترین غذاهای سنتی و محصولات محلی را از آشپزهای خانگی خریداری کنید</p>
    </div>
  `,
  styles: [`
    .welcome-banner {
      background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }
    p {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
    }
  `]
})
export class WelcomeBannersComponent {}
