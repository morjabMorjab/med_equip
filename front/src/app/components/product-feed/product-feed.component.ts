import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product, ApiResponse } from '../../services/product.service';

@Component({
    selector: 'app-product-feed',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="product-feed">
            <h2>محصولات ویژه</h2>
            
            <div class="loading" *ngIf="loading">
                <p>در حال بارگذاری...</p>
            </div>
            
            <div class="error" *ngIf="error">
                <p>خطا در بارگذاری محصولات: {{ error }}</p>
                <button (click)="loadFeaturedProducts()" class="retry-btn">تلاش مجدد</button>
            </div>
            
            <div class="product-grid" *ngIf="!loading && !error && products.length > 0">
                <div class="product-card" *ngFor="let product of products; trackBy: trackByProductId">
                    <div class="product-image">
                        <img [src]="getProductImage(product)" [alt]="product.name" 
                             (error)="onImageError($event)">
                        <div class="discount-badge" *ngIf="product.discount_percentage > 0">
                            {{ product.discount_percentage }}% تخفیف
                        </div>
                    </div>
                    
                    <div class="product-info">
                        <h3>{{ product.name }}</h3>
                        <p class="seller">{{ product.seller.shop_name }}</p>
                        
                        <div class="price">
                            <span class="current">{{ formatPrice(product.final_price) }} تومان</span>
                            <span class="original" *ngIf="product.discount_price">
                                {{ formatPrice(product.price) }} تومان
                            </span>
                        </div>
                        
                        <div class="rating" *ngIf="product.rating > 0">
                            <span class="stars">⭐ {{ product.rating }}</span>
                            <span class="reviews">({{ product.review_count }} نظر)</span>
                        </div>
                        
                        <button class="add-to-cart" (click)="addToCart(product)">افزودن به سبد</button>
                    </div>
                </div>
            </div>
            
            <div class="empty-state" *ngIf="!loading && !error && products.length === 0">
                <p>هیچ محصولی یافت نشد</p>
            </div>
        </div>
    `,
    styles: [`
        .product-feed {
            padding: 20px;
        }
        
        .product-feed h2 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
            font-size: 2rem;
        }
        
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .product-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s ease;
            background: white;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .product-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        
        .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .discount-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff4757;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .product-info {
            padding: 15px;
        }
        
        .product-info h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
            color: #333;
            line-height: 1.4;
        }
        
        .seller {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .price {
            margin-bottom: 10px;
        }
        
        .price .current {
            font-size: 18px;
            font-weight: bold;
            color: #2ed573;
        }
        
        .price .original {
            font-size: 14px;
            color: #999;
            text-decoration: line-through;
            margin-right: 10px;
        }
        
        .rating {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 15px;
            font-size: 14px;
        }
        
        .add-to-cart {
            width: 100%;
            padding: 10px;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.3s ease;
        }
        
        .add-to-cart:hover {
            background: #ff5252;
        }
        
        .loading, .error, .empty-state {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        
        .error {
            color: #ff4757;
        }
        
        .retry-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        
        .retry-btn:hover {
            background: #2980b9;
        }
        
        @media (max-width: 768px) {
            .product-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 15px;
            }
        }
    `]
})
export class ProductFeedComponent implements OnInit {
    products: Product[] = [];
    loading = true;
    error: string | null = null;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadFeaturedProducts();
    }

    loadFeaturedProducts(): void {
        this.loading = true;
        this.error = null;
        
        this.productService.getFeaturedProducts().subscribe({
            next: (response: ApiResponse<Product[]>) => {
                if (response.success) {
                    this.products = response.data;
                } else {
                    this.error = response.message;
                }
                this.loading = false;
            },
            error: (error: any) => {
                console.error('خطا در دریافت محصولات:', error);
                this.error = 'خطا در اتصال به سرور';
                this.loading = false;
            }
        });
    }

    getProductImage(product: Product): string {
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }
        return `https://picsum.photos/400/300?random=${product.id}`;
    }

    onImageError(event: any): void {
        event.target.src = `https://picsum.photos/400/300?random=${Math.random()}`;
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('fa-IR').format(price);
    }

    addToCart(product: Product): void {
        console.log('افزودن به سبد:', product.name);
        // اینجا منطق افزودن به سبد خرید پیاده‌سازی می‌شود
    }

    trackByProductId(index: number, product: Product): number {
        return product.id;
    }
}
