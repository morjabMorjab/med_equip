import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    template: `
        <app-header></app-header>
        <main class="main-container">
            <router-outlet></router-outlet>
        </main>
        <footer class="footer">
            <div class="container">
                <div class="footer-top">
                    <div class="footer-column">
                        <div class="footer-logo">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="20" r="20" fill="#ff4747"/>
                                <path d="M10 15h20v2H10zm0 4h20v2H10zm0 4h15v2H10z" fill="white"/>
                            </svg>
                            <h3>آشپز</h3>
                        </div>
                        <p class="footer-desc">بازار آشپزهای خوزستان - بهترین غذاهای سنتی و محصولات محلی</p>
                        <div class="social-links">
                            <a href="#" class="social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-title">دسترسی سریع</h4>
                        <ul class="footer-links">
                            <li><a href="/about">درباره ما</a></li>
                            <li><a href="/contact">تماس با ما</a></li>
                            <li><a href="/faq">سوالات متداول</a></li>
                            <li><a href="/terms">قوانین و مقررات</a></li>
                            <li><a href="/privacy">حریم خصوصی</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-title">دسته‌بندی‌های محبوب</h4>
                        <ul class="footer-links">
                            <li><a href="/category/traditional-food">غذاهای سنتی</a></li>
                            <li><a href="/category/fresh-fish">ماهی تازه</a></li>
                            <li><a href="/category/dates">انواع خرما</a></li>
                            <li><a href="/category/grilled-fish">ماهی کبابی</a></li>
                            <li><a href="/category/imported-goods">کالاهای ته لنجی</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-title">خدمات مشتریان</h4>
                        <ul class="footer-links">
                            <li><a href="/track-order">پیگیری سفارش</a></li>
                            <li><a href="/returns">بازگشت کالا</a></li>
                            <li><a href="/shipping">روش‌های ارسال</a></li>
                            <li><a href="/payment">روش‌های پرداخت</a></li>
                            <li><a href="/sellers">فروشندگان</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-title">تماس با ما</h4>
                        <ul class="contact-info">
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                                </svg>
                                <span>اهواز، خیابان کیانپارس، خیابان 8 شرقی</span>
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                <span>061-12345678</span>
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                <span>info&#64;ashpaz.com</span>
                            </li>
                        </ul>
                        <div class="app-badges">
                            <a href="#" class="app-badge">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play">
                            </a>
                            <a href="#" class="app-badge">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store">
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="payment-methods">
                        <span class="payment-title">روش‌های پرداخت:</span>
                        <div class="payment-icons">
                            <img src="https://picsum.photos/40/25?random=pay1" alt="پرداخت">
                            <img src="https://picsum.photos/40/25?random=pay2" alt="پرداخت">
                            <img src="https://picsum.photos/40/25?random=pay3" alt="پرداخت">
                            <img src="https://picsum.photos/40/25?random=pay4" alt="پرداخت">
                        </div>
                    </div>
                    <div class="copyright">
                        &copy; ۱۴۰۴ آشپز - بازار آشپزهای خوزستان. تمام حقوق محفوظ است.
                    </div>
                </div>
            </div>
        </footer>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        main {
            flex: 1;
        }

        /* Footer Styles */
        .footer {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 60px 0 20px;
        }

        .footer-top {
            display: grid;
            grid-template-columns: 2fr repeat(4, 1fr);
            gap: 30px;
            margin-bottom: 40px;
        }

        .footer-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .footer-logo h3 {
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin: 0;
        }

        .footer-desc {
            color: #bdc3c7;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .social-links {
            display: flex;
            gap: 15px;
        }

        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            color: white;
            transition: var(--transition);
        }

        .social-link:hover {
            background: var(--primary-color);
            transform: translateY(-3px);
        }

        .footer-title {
            color: white;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
        }

        .footer-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 50px;
            height: 2px;
            background: var(--primary-color);
        }

        .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .footer-links li {
            margin-bottom: 10px;
        }

        .footer-links a {
            color: #bdc3c7;
            transition: var(--transition);
            display: block;
        }

        .footer-links a:hover {
            color: white;
            padding-right: 5px;
        }

        .contact-info {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .contact-info li {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 15px;
            color: #bdc3c7;
        }

        .app-badges {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        .app-badge img {
            height: 35px;
        }

        .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }

        .payment-methods {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .payment-title {
            font-size: 14px;
            color: #bdc3c7;
        }

        .payment-icons {
            display: flex;
            gap: 10px;
        }

        .payment-icons img {
            height: 25px;
            border-radius: 4px;
        }

        .copyright {
            font-size: 14px;
            color: #95a5a6;
        }

        @media (max-width: 992px) {
            .footer-top {
                grid-template-columns: repeat(3, 1fr);
            }

            .footer-column:first-child {
                grid-column: span 3;
                margin-bottom: 20px;
            }
        }

        @media (max-width: 768px) {
            .footer-top {
                grid-template-columns: repeat(2, 1fr);
            }

            .footer-column:first-child {
                grid-column: span 2;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 20px;
                text-align: center;
            }
        }

        @media (max-width: 576px) {
            .footer-top {
                grid-template-columns: 1fr;
            }

            .footer-column:first-child {
                grid-column: span 1;
            }
        }
    `]
})
export class AppComponent {
    title = 'آشپز - بازار آشپزهای خوزستان';
}
