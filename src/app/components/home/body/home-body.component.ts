import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {
  products: any[] = [];
  offerImages: string[] = [
    '/uploads/promo/promo1.jpg',
    '/uploads/promo/promo2.jpg',
    '/uploads/promo/promo3.webp', 
    '/uploads/promo/promo4.webp',
    '/uploads/promo/promo5.webp', 
    '/uploads/promo/promo6.webp'
  ];

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

}
