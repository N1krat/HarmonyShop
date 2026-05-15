import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// AdminService, Product model and CartService temporarily removed

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {
  products: any[] = [];
  

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // product loading disabled until AdminService is restored
  }

  addToCart(product: any) {
  // cart functionality temporarily disabled until CartService is restored
  alert(`${product?.name || 'Product'} added to cart (stub)`);
} 



  openProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
