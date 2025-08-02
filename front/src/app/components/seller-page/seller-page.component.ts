import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from '../../services/seller.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-seller-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {
  sellerData$: Observable<{seller: any, products: any[]}>;

  constructor(
    private route: ActivatedRoute,
    private sellerService: SellerService
  ) {}

  ngOnInit(): void {
    const sellerId = Number(this.route.snapshot.paramMap.get('id'));
    this.sellerData$ = this.sellerService.getSellerDetails(sellerId);
  }
}