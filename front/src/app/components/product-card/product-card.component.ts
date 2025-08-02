import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <-- ۱. این خط را اضافه کنید

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- ۲. RouterLink را به آرایه imports اضافه کنید
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product;
}