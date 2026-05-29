import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service'; // adjust path
import { CartService } from '../../core/services/cart.service';
import { TranslatePipe } from '../../../shared/translate.pipe';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  loading = true;
  categories: string[] = [];
  
  selectedCategory = '';
  minPrice = 0;
  maxPrice = 100000;
  searchQuery = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private translationService: TranslationService
  ) {
  }

  ngOnInit(): void {
    
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
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
      }
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;

      },

      error: (err) => {
        this.loading = false;
      }
    });
  }

  performSearch() {
    if (!this.searchQuery.trim()) {
      this.loadProducts();
      return;
    }

    this.loading = true;
    this.productService.searchProducts(this.searchQuery).subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.loading = true;

    this.productService.filterProducts(
      this.selectedCategory || undefined,
      this.minPrice,
      this.maxPrice
    ).subscribe({
      next: (data) => {
        this.filteredProducts = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

  resetFilters() {
    this.selectedCategory = '';
    this.minPrice = 0;
    this.maxPrice = 100000;
    this.searchQuery = '';
    this.loadProducts();
  }

  addToCart(product: any) {
    
    if (!product || !product.id) {
      alert(this.translationService.translate('products.invalidProduct'));
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name || 'Unknown',
      price: product.price || 0,
      quantity: 1,
      image: product.images?.[0] || product.image
    };

    this.cartService.addToCart(cartItem);
    alert(this.translationService.translate('products.addedToCart', { name: product?.name || 'Product' }));
  }

  openProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
