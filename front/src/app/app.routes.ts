import { Routes } from '@angular/router';

// فقط کامپوننت‌هایی را وارد می‌کنیم که واقعا به عنوان صفحه استفاده می‌شوند
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SellerPageComponent } from './components/seller-page/seller-page.component';

export const routes: Routes = [
  // روت صفحه اصلی
  { path: '', component: HomeComponent },
  
  // روت‌های احراز هویت
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // روت صفحه فروشنده
  // این تنها روت داینامیک ما در حال حاضر است
  { path: 'sellers/:id', component: SellerPageComponent },
  
  // (اختیاری) یک روت برای زمانی که آدرس اشتباه وارد شود
  // { path: '**', redirectTo: '' } 
];