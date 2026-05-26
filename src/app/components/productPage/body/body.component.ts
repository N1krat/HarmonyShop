import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {
  product?: any;
  quantity: number = 1;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.adminService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedImage = data.images?.[0] || '';
        this.quantity = 1;
        console.log('Product loaded:', data);
      },
      error: (err) => {
        console.error('Error loading product:', err);
      }
    });
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Helper to get full URL for backend images
  getImageUrl(imgPath?: string): string {
    return imgPath ? `http://localhost:3000${imgPath}` : 'assets/no-image.png';
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
      quantity: this.quantity,
      image: product.images?.[0] || product.image || ''
    };

    console.log('🛒 Adding to cart:', cartItem);
    this.cartService.addToCart(cartItem);
    alert(`${product?.name || 'Product'} x${this.quantity} added to cart`);
    this.quantity = 1; // Reset quantity after adding to cart
  }
}
