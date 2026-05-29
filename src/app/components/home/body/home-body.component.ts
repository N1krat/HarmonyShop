import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { SHARED_UI_IMPORTS } from '../../../shared/shared-ui.imports';

@Component({
  selector: 'app-home-body',
  standalone: true,
  imports: [...SHARED_UI_IMPORTS],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class HomeBodyComponent implements OnInit {
  products: any[] = [
    { name: 'Product 1', price: 199, image: '../../../../backend/uploads/promo/promo1.webp' },
    { name: 'Product 2', price: 299, image: '../../../../backend/uploads/promo/promo2.webp' },
    { name: 'Product 3', price: 399, image: '../../../../backend/uploads/promo/promo3.webp' },
  ];

  offerImages: string[] = [
    '/uploads/promo/promo1.webp',
    '/uploads/promo/promo2.webp',
    '/uploads/promo/promo3.webp',
    '/uploads/promo/promo4.webp',
    '/uploads/promo/promo5.webp',
    '/uploads/promo/promo6.webp'
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.products = data;
        }
      },
      error: (err) => {
        console.error('API unavailable, using hardcoded products:', err);
      }
    });
  }
}
