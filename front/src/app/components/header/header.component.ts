import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    template: `
        <header class="header" [class.scrolled]="isScrolled">
            <!-- Top Bar -->
            <div class="top-bar">
                <div class="container">
                    <div class="top-bar-content">
                        <div class="top-bar-left">
                            <a href="/seller-center" class="seller-link">
                                <i class="icon-store"></i>
                                مرکز فروشندگان
                            </a>
                            <span class="divider">|</span>
                            <a href="/download-app" class="app-link">
                                <i class="icon-mobile"></i>
                                دانلود اپلیکیشن
                            </a>
                        </div>
                        <div class="top-bar-right">
                            <div class="language-currency">
                                <button class="lang-btn">
                                    <img src="https://flagcdn.com/16x12/ir.png" alt="IR">
                                    فارسی / IRR
                                </button>
                            </div>
                            <div class="help-center">
                                <a href="/help">
                                    <i class="icon-help"></i>
                                    مرکز پشتیبانی
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Header -->
            <div class="main-header">
                <div class="container">
                    <div class="header-content">
                        <!-- Logo -->
                        <div class="logo-section">
                            <a routerLink="/" class="logo">
                                <div class="logo-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <circle cx="16" cy="16" r="16" fill="#ff4747"/>
                                        <path d="M8 12h16v2H8zm0 4h16v2H8zm0 4h12v2H8z" fill="white"/>
                                    </svg>
                                </div>
                                <span class="logo-text">آشپز</span>
                            </a>
                        </div>

                        <!-- Search Section -->
                        <div class="search-section">
                            <div class="search-container">
                                <div class="search-box" [class.focused]="searchFocused">
                                    <input 
                                        type="text" 
                                        class="search-input"
                                        placeholder="جستجو در میان هزاران محصول..."
                                        [(ngModel)]="searchQuery"
                                        (focus)="searchFocused = true"
                                        (blur)="searchFocused = false"
                                        (keyup)="onSearchInput($event)"
                                        (keyup.enter)="performSearch()"
                                    >
                                    <button class="search-btn" (click)="performSearch()">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M9 17A8 8 0 109 1a8 8 0 000 16z" stroke="currentColor" stroke-width="2"/>
                                            <path d="M15 15l3.5 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                                
                                <!-- Search Suggestions -->
                                <div class="search-suggestions" *ngIf="showSuggestions && suggestions.length > 0">
                                    <div class="suggestions-header">
                                        <span>پیشنهادات</span>
                                    </div>
                                    <div 
                                        class="suggestion-item" 
                                        *ngFor="let suggestion of suggestions"
                                        (click)="selectSuggestion(suggestion)"
                                    >
                                        <i class="icon-search"></i>
                                        <span [innerHTML]="highlightMatch(suggestion)"></span>
                                        <span class="suggestion-count">{{ getSuggestionCount() }} محصول</span>
                                    </div>
                                    <div class="trending-searches">
                                        <div class="trending-header">جستجوهای پرطرفدار</div>
                                        <div class="trending-tags">
                                            <span class="tag" *ngFor="let trend of trendingSearches" (click)="searchTrending(trend)">
                                                {{ trend }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- User Actions -->
                        <div class="user-actions">
                            <!-- User Account -->
                            <div class="action-item account-dropdown" (mouseenter)="showAccountMenu = true" (mouseleave)="showAccountMenu = false">
                                <button class="action-btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    <span>حساب کاربری</span>
                                </button>
                                
                                <div class="dropdown-menu account-menu" *ngIf="showAccountMenu">
                                    <div class="menu-header">
                                        <button class="btn btn-primary full-width">ورود</button>
                                        <button class="btn btn-secondary full-width mt-2">ثبت نام</button>
                                    </div>
                                    <div class="menu-divider"></div>
                                    <a href="/profile" class="menu-item">
                                        <i class="icon-user"></i>
                                        حساب من
                                    </a>
                                    <a href="/orders" class="menu-item">
                                        <i class="icon-package"></i>
                                        سفارشات من
                                    </a>
                                    <a href="/wishlist" class="menu-item">
                                        <i class="icon-heart"></i>
                                        لیست علاقه‌مندی
                                        <span class="badge">{{ wishlistCount }}</span>
                                    </a>
                                    <a href="/coupons" class="menu-item">
                                        <i class="icon-ticket"></i>
                                        کوپن‌های من
                                    </a>
                                </div>
                            </div>

                            <!-- Cart -->
                            <div class="action-item cart-dropdown" (mouseenter)="showCartPreview = true" (mouseleave)="showCartPreview = false">
                                <a routerLink="/cart" class="action-btn">
                                    <div class="cart-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v8m0-8l2.293 2.293c.63.63.184 1.707-.707 1.707H11" stroke="currentColor" stroke-width="1.5"/>
                                            <circle cx="9" cy="22" r="1" fill="currentColor"/>
                                            <circle cx="20" cy="22" r="1" fill="currentColor"/>
                                        </svg>
                                        <span class="cart-badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
                                    </div>
                                    <span>سبد خرید</span>
                                </a>
                                
                                <div class="dropdown-menu cart-preview" *ngIf="showCartPreview && cartItems.length > 0">
                                    <div class="cart-items">
                                        <div class="cart-item" *ngFor="let item of cartItems.slice(0, 3)">
                                            <img [src]="item.image" [alt]="item.name">
                                            <div class="item-details">
                                                <div class="item-name">{{ item.name }}</div>
                                                <div class="item-price">{{ item.quantity }} × {{ formatPrice(item.price) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart-footer">
                                        <div class="cart-total">
                                            <span>مجموع:</span>
                                            <span class="total-amount">{{ formatPrice(cartTotal) }}</span>
                                        </div>
                                        <a routerLink="/cart" class="btn btn-primary full-width">
                                            مشاهده سبد خرید
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Category Navigation -->
            <nav class="category-nav">
                <div class="container">
                    <div class="nav-content">
                        <!-- Categories Dropdown -->
                        <div class="categories-dropdown" (mouseenter)="showCategories = true" (mouseleave)="showCategories = false">
                            <button class="categories-btn">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                <span>دسته‌بندی‌ها</span>
                            </button>
                            
                            <div class="mega-menu" *ngIf="showCategories">
                                <div class="mega-menu-content">
                                    <div class="category-column" *ngFor="let category of mainCategories">
                                        <div class="category-header">
                                            <i [class]="category.icon"></i>
                                            <h3>{{ category.name }}</h3>
                                        </div>
                                        <ul class="subcategory-list">
                                            <li *ngFor="let sub of category.subcategories">
                                                <a [href]="'/category/' + sub.slug">{{ sub.name }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="quick-links">
                            <a routerLink="/super-deals" class="nav-link hot">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 1l2.5 5 5.5.5-4 4L13 16l-5-3-5 3 1-5.5-3-3L5.5 6z"/>
                                </svg>
                                پیشنهادات ویژه
                            </a>
                            <a routerLink="/new-arrivals" class="nav-link">تازه‌ها</a>
                            <a routerLink="/best-sellers" class="nav-link">پرفروش‌ترین‌ها</a>
                            <a routerLink="/local-products" class="nav-link">محصولات محلی</a>
                            <a routerLink="/traditional-foods" class="nav-link">غذاهای سنتی</a>
                        </div>

                        <!-- Delivery Info -->
                        <div class="delivery-info">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L2 7v6c0 3.5 2.5 6.5 8 8 5.5-1.5 8-4.5 8-8V7l-8-5z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            <span>ارسال رایگان برای خرید بالای 200 هزار تومان</span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    `,
    styles: [`
        /* Header Styles */
        .header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: var(--transition);
        }

        .header.scrolled {
            box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        /* Top Bar */
        .top-bar {
            background: #fafafa;
            border-bottom: 1px solid var(--border-color);
            font-size: 12px;
        }

        .top-bar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 32px;
        }

        .top-bar-left,
        .top-bar-right {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .top-bar a {
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 4px;
            transition: var(--transition);
        }

        .top-bar a:hover {
            color: var(--primary-color);
        }

        .divider {
            color: #ddd;
        }

        .lang-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 4px 12px;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 12px;
            color: var(--text-secondary);
            cursor: pointer;
            transition: var(--transition);
        }

        .lang-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }

        /* Main Header */
        .main-header {
            padding: 16px 0;
        }

        .header-content {
            display: flex;
            align-items: center;
            gap: 32px;
        }

        /* Logo */
        .logo-section {
            flex-shrink: 0;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
        }

        .logo:hover {
            color: var(--text-primary);
        }

        .logo-icon {
            width: 40px;
            height: 40px;
        }

        .logo-text {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Search Section */
        .search-section {
            flex: 1;
            max-width: 600px;
        }

        .search-container {
            position: relative;
        }

        .search-box {
            display: flex;
            align-items: center;
            background: var(--bg-gray);
            border: 2px solid transparent;
            border-radius: 24px;
            overflow: hidden;
            transition: var(--transition);
        }

        .search-box.focused {
            border-color: var(--primary-color);
            background: white;
            box-shadow: 0 4px 12px rgba(255, 71, 71, 0.15);
        }

        .search-input {
            flex: 1;
            padding: 10px 20px;
            border: none;
            background: transparent;
            font-size: 14px;
            outline: none;
        }

        .search-btn {
            padding: 10px 20px;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            transition: var(--transition);
        }

        .search-btn:hover {
            color: var(--primary-color);
        }

        /* Search Suggestions */
        .search-suggestions {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: white;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
            animation: slideIn 0.3s ease-out;
        }

        .suggestions-header {
            padding: 12px 16px;
            font-size: 12px;
            color: var(--text-light);
            background: var(--bg-gray);
            font-weight: 500;
        }

        .suggestion-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            cursor: pointer;
            transition: var(--transition);
        }

        .suggestion-item:hover {
            background: var(--bg-gray);
        }

        .suggestion-count {
            margin-right: auto;
            font-size: 12px;
            color: var(--text-light);
        }

        .trending-searches {
            padding: 16px;
            border-top: 1px solid var(--border-color);
        }

        .trending-header {
            font-size: 12px;
            color: var(--text-light);
            margin-bottom: 8px;
            font-weight: 500;
        }

        .trending-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .tag {
            padding: 4px 12px;
            background: var(--bg-gray);
            border-radius: 16px;
            font-size: 12px;
            color: var(--text-secondary);
            cursor: pointer;
            transition: var(--transition);
        }

        .tag:hover {
            background: var(--primary-color);
            color: white;
        }

        /* User Actions */
        .user-actions {
            display: flex;
            align-items: center;
            gap: 24px;
        }

        .action-item {
            position: relative;
        }

        .action-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: transparent;
            border: none;
            color: var(--text-primary);
            cursor: pointer;
            transition: var(--transition);
            font-size: 14px;
        }

        .action-btn:hover {
            color: var(--primary-color);
        }

        .cart-icon {
            position: relative;
        }

        .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            min-width: 18px;
            height: 18px;
            padding: 0 4px;
            background: var(--primary-color);
            color: white;
            font-size: 11px;
            font-weight: 500;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Dropdown Menus */
        .dropdown-menu {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            background: white;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            min-width: 280px;
            animation: fadeIn 0.3s ease-out;
        }

        .account-menu {
            padding: 16px;
        }

        .menu-header {
            margin-bottom: 16px;
        }

        .full-width {
            width: 100%;
        }

        .menu-divider {
            height: 1px;
            background: var(--border-color);
            margin: 16px -16px;
        }

        .menu-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 0;
            color: var(--text-primary);
            transition: var(--transition);
        }

        .menu-item:hover {
            color: var(--primary-color);
        }

        .menu-item .badge {
            margin-right: auto;
            padding: 2px 8px;
            background: var(--primary-color);
            color: white;
            font-size: 11px;
            border-radius: 10px;
        }

        /* Cart Preview */
        .cart-preview {
            width: 320px;
            max-height: 400px;
            display: flex;
            flex-direction: column;
        }

        .cart-items {
            padding: 16px;
            max-height: 250px;
            overflow-y: auto;
        }

        .cart-item {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
        }

        .cart-item img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
        }

        .item-details {
            flex: 1;
        }

        .item-name {
            font-size: 13px;
            color: var(--text-primary);
            margin-bottom: 4px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .item-price {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .cart-footer {
            padding: 16px;
            border-top: 1px solid var(--border-color);
        }

        .cart-total {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-weight: 500;
        }

        .total-amount {
            color: var(--primary-color);
        }

        /* Category Navigation */
        .category-nav {
            background: var(--bg-gray);
            border-top: 1px solid var(--border-color);
        }

        .nav-content {
            display: flex;
            align-items: center;
            height: 48px;
            gap: 32px;
        }

        .categories-dropdown {
            position: relative;
        }

        .categories-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
        }

        .categories-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }

        /* Mega Menu */
        .mega-menu {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            background: white;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            min-width: 800px;
            animation: fadeIn 0.3s ease-out;
        }

        .mega-menu-content {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            padding: 24px;
            gap: 32px;
        }

        .category-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--border-color);
        }

        .category-header h3 {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .subcategory-list {
            list-style: none;
        }

        .subcategory-list li {
            margin-bottom: 8px;
        }

        .subcategory-list a {
            font-size: 13px;
            color: var(--text-secondary);
            transition: var(--transition);
        }

        .subcategory-list a:hover {
            color: var(--primary-color);
            padding-right: 4px;
        }

        /* Quick Links */
        .quick-links {
            display: flex;
            gap: 24px;
            flex: 1;
        }

        .nav-link {
            font-size: 14px;
            font-weight: 500;
            color: var(--text-primary);
            transition: var(--transition);
            position: relative;
        }

        .nav-link:hover {
            color: var(--primary-color);
        }

        .nav-link.hot {
            color: var(--primary-color);
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .nav-link.hot svg {
            animation: pulse 1s ease-in-out infinite;
        }

        /* Delivery Info */
        .delivery-info {
            margin-right: auto;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: var(--text-secondary);
        }

        .delivery-info svg {
            color: #52c41a;
        }

        /* Icons */
        [class^="icon-"] {
            width: 16px;
            height: 16px;
            display: inline-block;
        }

        /* Responsive */
        @media (max-width: 1200px) {
            .header-content {
                gap: 24px;
            }

            .search-section {
                max-width: 400px;
            }

            .mega-menu {
                min-width: 600px;
            }

            .mega-menu-content {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 992px) {
            .top-bar {
                display: none;
            }

            .header-content {
                gap: 16px;
            }

            .quick-links {
                display: none;
            }

            .delivery-info {
                display: none;
            }
        }

        @media (max-width: 768px) {
            .main-header {
                padding: 12px 0;
            }

            .header-content {
                flex-wrap: wrap;
            }

            .logo-section {
                order: 1;
                flex: 0 0 auto;
            }

            .user-actions {
                order: 2;
                flex: 0 0 auto;
                margin-right: auto;
            }

            .search-section {
                order: 3;
                flex: 0 0 100%;
                max-width: 100%;
                margin-top: 12px;
            }

            .action-btn span {
                display: none;
            }

            .mega-menu {
                position: fixed;
                top: 60px;
                right: 0;
                left: 0;
                min-width: auto;
                border-radius: 0;
            }

            .mega-menu-content {
                grid-template-columns: repeat(2, 1fr);
                padding: 16px;
            }
        }
    `]
})
export class HeaderComponent implements OnInit {
    isScrolled = false;
    searchQuery = '';
    searchFocused = false;
    showSuggestions = false;
    suggestions: string[] = [];
    trendingSearches = ['غذای خانگی', 'ماهی تازه', 'خرمای رطب', 'دمپخت', 'قلیه ماهی'];
    
    showAccountMenu = false;
    showCartPreview = false;
    showCategories = false;
    
    wishlistCount = 3;
    cartCount = 2;
    cartTotal = 450000;
    
    cartItems = [
        {
            id: 1,
            name: 'قلیه ماهی جنوبی با برنج دمکشیده',
            image: 'https://picsum.photos/60/60?random=1',
            price: 180000,
            quantity: 1
        },
        {
            id: 2,
            name: 'خرمای رطب مضافتی درجه یک',
            image: 'https://picsum.photos/60/60?random=2',
            price: 90000,
            quantity: 3
        }
    ];
    
    mainCategories = [
        {
            name: 'غذاهای سنتی',
            icon: 'icon-food',
            subcategories: [
                { name: 'قلیه ماهی', slug: 'ghelyeh-mahi' },
                { name: 'قلیه میگو', slug: 'ghelyeh-meygu' },
                { name: 'دمپخت', slug: 'dampokht' },
                { name: 'حلیم بادمجان', slug: 'halim-bademjan' },
                { name: 'آش شله قلمکار', slug: 'ash-sholeh' },
                { name: 'کوکو سبزی', slug: 'kuku-sabzi' }
            ]
        },
        {
            name: 'ماهی و میگو',
            icon: 'icon-fish',
            subcategories: [
                { name: 'ماهی تازه', slug: 'fresh-fish' },
                { name: 'ماهی دودی', slug: 'smoked-fish' },
                { name: 'ماهی کبابی', slug: 'grilled-fish' },
                { name: 'میگو تازه', slug: 'fresh-shrimp' },
                { name: 'کنسرو ماهی', slug: 'canned-fish' }
            ]
        },
        {
            name: 'خرما و رطب',
            icon: 'icon-dates',
            subcategories: [
                { name: 'خرمای مضافتی', slug: 'mozafati-dates' },
                { name: 'خرمای کبکاب', slug: 'kabkab-dates' },
                { name: 'خرمای زاهدی', slug: 'zahedi-dates' },
                { name: 'رطب تازه', slug: 'fresh-rotab' },
                { name: 'شیره خرما', slug: 'date-syrup' }
            ]
        },
        {
            name: 'کالاهای ته لنجی',
            icon: 'icon-ship',
            subcategories: [
                { name: 'ادویه جات', slug: 'spices' },
                { name: 'چای خارجی', slug: 'foreign-tea' },
                { name: 'پارچه', slug: 'fabric' },
                { name: 'لوازم آرایشی', slug: 'cosmetics' },
                { name: 'عطر و ادکلن', slug: 'perfume' }
            ]
        }
    ];

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 10;
    }

    ngOnInit(): void {
        // شبیه‌سازی بارگذاری داده‌ها
    }

    onSearchInput(event: any): void {
        const query = event.target.value;
        if (query.length > 2) {
            this.showSuggestions = true;
            this.suggestions = [
                'قلیه ماهی جنوبی',
                'قلیه میگو خوزستانی',
                'قلیه تره',
                'قلیه بادمجان'
            ].filter(s => s.includes(query));
        } else {
            this.showSuggestions = false;
        }
    }

    performSearch(): void {
        console.log('جستجو برای:', this.searchQuery);
        this.showSuggestions = false;
    }

    selectSuggestion(suggestion: string): void {
        this.searchQuery = suggestion;
        this.performSearch();
    }

    searchTrending(trend: string): void {
        this.searchQuery = trend;
        this.performSearch();
    }

    highlightMatch(text: string): string {
        if (!this.searchQuery) return text;
        const regex = new RegExp(`(${this.searchQuery})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    getSuggestionCount(): number {
        return Math.floor(Math.random() * 50) + 10;
    }

    formatPrice(price: number): string {
        return price.toLocaleString('fa-IR') + ' تومان';
    }
}
