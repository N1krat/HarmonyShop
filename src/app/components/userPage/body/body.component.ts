import { Component, OnInit } from '@angular/core';
// AdminService and AuthService temporarily removed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  templateUrl: './body.html',
  styleUrls: ['./body.css'],
  imports: [CommonModule]
})
export class BodyComponent implements OnInit {
  email: string | null = null;
  userId: number | null = null;
  orders: any[] = [];

  constructor() {}

  ngOnInit() {
    // user lookup disabled until services are restored
  }

  // getUserId and loadOrders disabled until AdminService is restored
}
