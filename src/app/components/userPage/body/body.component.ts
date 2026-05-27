import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-body',
  standalone: true,
  templateUrl: './body.html',
  styleUrls: ['./body.css'],
  imports: [CommonModule, RouterModule]
})
export class BodyComponent implements OnInit {
  email: string | null = null;
  userId: number | null = null;
  orders: any[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUserId();
    this.loadOrders();
  }

  getUserId() {
    this.userId = this.authService.getUserId();
    this.email = localStorage.getItem('email');
  }

  loadOrders() {
    if (!this.userId) {
      console.warn('User ID not found');
      return;
    }

    this.adminService.getOrdersForUser(this.userId).subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Orders loaded:', data);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      }
    });
  }
}
