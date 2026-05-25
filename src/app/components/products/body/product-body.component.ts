import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service'; // adjust path
import { CartService } from '../../core/services/cart.service';

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
    private productService: ProductService,
    private cartService: CartService
  ) {
    console.log('🛍️ ProductBodyComponent initialized');
  }

  ngOnInit(): void {
    console.log('🛍️ ProductBodyComponent ngOnInit called');
    this.loadProducts();
  }

  loadProducts() {
    console.log('🛍️ Loading products...');
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;

        console.log('✅ 🛍️ Products loaded:', data);
      },

      error: (err) => {
        console.error('❌ 🛍️ Error loading products:', err);
        this.loading = false;
      }
    });
  }

  addToCart(product: any) {
    console.log('🛒 Add to cart clicked for product:', product);
    
    if (!product || !product.id) {
      console.error('❌ 🛒 Product is invalid:', product);
      alert('Invalid product');
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name || 'Unknown',
      price: product.price || 0,
      quantity: 1,
      image: product.images?.[0] || product.image
    };

    console.log('🛒 Adding to cart:', cartItem);
    this.cartService.addToCart(cartItem);
    alert(`${product?.name || 'Product'} added to cart`);
  }

  openProduct(id: number) {
    console.log('📦 Opening product detail page for id:', id);
    this.router.navigate(['/product', id]);
  }
}