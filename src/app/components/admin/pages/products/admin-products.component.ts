import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class AdminProducts implements OnInit {

  products: any[] = [];
  isEditing = false;
  editingProductId: number | null = null;

  newProduct: any = {
    name: '',
    description: '',
    stock: 0,
    price: 0,
    category: 'Electronics',
    rating: 0,
    imageFile: null
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    console.log('📦 Loading products...');
    this.adminService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('✅ 📦 Products loaded:', data);
      },
      error: (err) => {
        console.error('❌ 📦 Error loading products:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newProduct.imageFile = file;
    }
  }

  editProduct(product: any) {
    console.log('📝 Editing product:', product.id);
    this.isEditing = true;
    this.editingProductId = product.id;
    this.newProduct = { ...product };
  }

  cancelEdit() {
    console.log('❌ Cancel edit');
    this.isEditing = false;
    this.editingProductId = null;
    this.newProduct = {
      name: '',
      description: '',
      stock: 0,
      price: 0,
      category: 'Electronics',
      rating: 0,
      imageFile: null
    };
  }

  addProduct() {
    if (this.isEditing && this.editingProductId) {
      this.updateProduct();
      return;
    }

    console.log('📝 Adding new product:', this.newProduct.name);
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('stock', this.newProduct.stock);
    formData.append('price', this.newProduct.price);
    formData.append('category', this.newProduct.category || 'Electronics');
    formData.append('rating', this.newProduct.rating || 0);
    if (this.newProduct.imageFile) {
      formData.append('image', this.newProduct.imageFile);
    }

    this.adminService.addProduct(formData).subscribe({
      next: (data) => {
        console.log('✅ 📝 Product added:', data);
        this.loadProducts();
        this.newProduct = {
          name: '',
          description: '',
          stock: 0,
          price: 0,
          category: 'Electronics',
          rating: 0,
          imageFile: null
        };
      },
      error: (err) => {
        console.error('❌ 📝 Error adding product:', err);
      }
    });
  }

  updateProduct() {
    if (!this.editingProductId) return;

    console.log('📝 Updating product:', this.editingProductId);
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('stock', this.newProduct.stock);
    formData.append('price', this.newProduct.price);
    formData.append('category', this.newProduct.category || 'Electronics');
    formData.append('rating', this.newProduct.rating || 0);
    if (this.newProduct.imageFile) {
      formData.append('image', this.newProduct.imageFile);
    }

    this.adminService.updateProduct(this.editingProductId, formData).subscribe({
      next: (data) => {
        console.log('✅ 📝 Product updated:', data);
        this.loadProducts();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('❌ 📝 Error updating product:', err);
      }
    });
  }

  removeProduct(id: number) {
    console.log('🗑️ Deleting product:', id);
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.removeProduct(id).subscribe({
        next: () => {
          console.log('✅ 🗑️ Product removed:', id);
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('❌ 🗑️ Error removing product:', err);
        }
      });
    }
  }
}
