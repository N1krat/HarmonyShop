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

  newProduct: any = {
    name: '',
    description: '',
    stock: 0,
    price: 0,
    image: ''
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.adminService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products loaded:', data);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newProduct.imageFile = file;
    }
  }

  addProduct() {
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('stock', this.newProduct.stock);
    formData.append('price', this.newProduct.price);
    if (this.newProduct.imageFile) {
      formData.append('image', this.newProduct.imageFile);
    }

    this.adminService.addProduct(formData).subscribe({
      next: (data) => {
        this.products.push(data);
        this.newProduct = { name: '', description: '', stock: 0, price: 0, image: '' };
        console.log('Product added:', data);
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }

  removeProduct(id: number) {
    this.adminService.removeProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        console.log('Product removed:', id);
      },
      error: (err) => {
        console.error('Error removing product:', err);
      }
    });
  }
}

