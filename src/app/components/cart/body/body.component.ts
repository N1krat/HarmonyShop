
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {
  cartItems: any[] = [];
  remove(item: any) {}
  increase(item: any) {}
  decrease(item: any) {}
  checkout() {}
  totalPrice = 0;
  products: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Services removed: stub cart/products
    this.products = [];
    this.cartItems = [];
    this.totalPrice = 0;
  }

  // increase(item: any) { /* stub */ }
  // decrease(item: any) { /* stub */ }
  // remove(item: any) { /* stub */ }
  // checkout() { /* stub */ }




}
