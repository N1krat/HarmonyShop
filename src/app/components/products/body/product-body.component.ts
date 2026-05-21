import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service'; // adjust path

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {

  products: any[] = [];
  loading = true;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;

        console.log('Products loaded:', data);
      },

      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }

  addToCart(product: any) {
    alert(`${product?.name || 'Product'} added to cart`);
  }

  openProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}