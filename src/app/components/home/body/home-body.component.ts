import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// AdminService and Product model removed temporarily (will add back later)

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

  constructor() {}

  ngOnInit(): void {
    // products loading disabled until AdminService is restored
  }

}
