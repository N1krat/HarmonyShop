import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {
    // this.loadProducts();
  }

  // loadProducts() {
  //   // AdminService removed: stub products
  //   this.products = [];
  // }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newProduct.imageFile = file;
    }
  }

  addProduct() {
    // AdminService removed: stub add
    this.products.push({ ...this.newProduct });
    this.newProduct = { name: '', description: '', stock: 0, price: 0, image: '' };
  }

  removeProduct(id: number) {
    // AdminService removed: stub remove
    this.products = this.products.filter(p => p.id !== id);
  }
}
