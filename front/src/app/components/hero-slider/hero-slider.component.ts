import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// ۱. وارد کردن کلاس اصلی Swiper و ماژول‌های مورد نیاز
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css']
  // دیگر نیازی به CUSTOM_ELEMENTS_SCHEMA نیست
})
export class HeroSliderComponent implements AfterViewInit {
  
  slides = [
    { img: 'https://picsum.photos/id/101/1200/400', title: 'تخفیف ویژه غذاهای دریایی' },
    { img: 'https://picsum.photos/id/102/1200/400', title: 'بهترین خرما از نخلستان' },
    { img: 'https://picsum.photos/id/103/1200/400', title: 'کالاهای کمیاب ته لنجی' }
  ];

  // این تابع بعد از اینکه قالب HTML کاملا رندر شد، اجرا می‌شود
  ngAfterViewInit(): void {
    // ۲. ساخت یک نمونه جدید از Swiper
    const swiper = new Swiper('.hero-swiper', {
      // ۳. معرفی ماژول‌هایی که می‌خواهیم استفاده کنیم
      modules: [Navigation, Pagination, Autoplay],

      // ۴. تنظیمات اسلایدر
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}