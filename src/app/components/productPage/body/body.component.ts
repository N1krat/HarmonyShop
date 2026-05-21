import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {
  product?: Product;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    // AdminService removed: stub product loading
    this.product = {
      id,
      name: 'Sample Product',
      description: 'Description',
      price: 0,
      stock: 0,
      image: null,
      images: []
    };
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
