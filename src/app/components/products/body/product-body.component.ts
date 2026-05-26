import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service'; // adjust path
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  loading = true;
  categories: string[] = [];
  
  // Filter options
  selectedCategory = '';
  minPrice = 0;
  maxPrice = 10000;
  searchQuery = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    console.log('🛍️ ProductBodyComponent initialized');
  }

  ngOnInit(): void {
    console.log('🛍️ ProductBodyComponent ngOnInit called');
    
    // Load categories
    this.loadCategories();
    
    // Check for search query in URL
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
        this.performSearch();
      } else {
        this.loadProducts();
      }
    });
  }

  loadCategories() {
    console.log('📂 Loading categories...');
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('✅ 📂 Categories loaded:', data);
      },
      error: (err) => {
        console.error('❌ 📂 Error loading categories:', err);
      }
    });
  }

  loadProducts() {
    console.log('🛍️ Loading products...');
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;

        console.log('✅ 🛍️ Products loaded:', data);
      },

      error: (err) => {
        console.error('❌ 🛍️ Error loading products:', err);
        this.loading = false;
      }
    });
  }

  performSearch() {
    if (!this.searchQuery.trim()) {
      this.loadProducts();
      return;
    }

    console.log('🔍 Searching products for:', this.searchQuery);
    this.loading = true;
    this.productService.searchProducts(this.searchQuery).subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
        console.log('✅ 🔍 Search results:', data);
      },
      error: (err) => {
        console.error('❌ 🔍 Search error:', err);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    console.log('🔍 Applying filters - category:', this.selectedCategory, 'price:', this.minPrice, '-', this.maxPrice);
    this.loading = true;

    this.productService.filterProducts(
      this.selectedCategory || undefined,
      this.minPrice,
      this.maxPrice
    ).subscribe({
      next: (data) => {
        this.filteredProducts = data;
        this.loading = false;
        console.log('✅ 🔍 Filtered results:', data);
      },
      error: (err) => {
        console.error('❌ 🔍 Filter error:', err);
        this.loading = false;
      }
    });
  }

  resetFilters() {
    console.log('🔄 Resetting filters');
    this.selectedCategory = '';
    this.minPrice = 0;
    this.maxPrice = 10000;
    this.searchQuery = '';
    this.loadProducts();
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
