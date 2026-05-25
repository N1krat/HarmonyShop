import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminOrders implements OnInit {
  orders: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Orders loaded:', data);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      }
    });
  }

  updateStatus(order: any) {
    this.adminService.updateOrderStatus(order.id, order.status).subscribe({
      next: (data) => {
        console.log(`Order #${order.id} status updated to ${order.status}`);
      },
      error: (err) => {
        console.error('Error updating order status:', err);
      }
    });
  }
}
