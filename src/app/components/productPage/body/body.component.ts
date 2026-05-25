import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
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
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
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
        console.log('Product loaded:', data);
      },
      error: (err) => {
        console.error('Error loading product:', err);
      }
    });
  }

  // Helper to get full URL for backend images
  getImageUrl(imgPath?: string): string {
    return imgPath ? `http://localhost:3000${imgPath}` : 'assets/no-image.png';
  }

  addToCart(product: Product) {
    console.log('Add to cart clicked', product);
    // implement cart logic here
  }
}
