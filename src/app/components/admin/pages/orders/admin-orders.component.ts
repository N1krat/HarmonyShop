import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminOrders implements OnInit {
  orders: any[] = [];

  constructor() {}

  ngOnInit() {
    // this.loadOrders();
  }

  // loadOrders() {
  //   // AdminService removed: stub orders
  //   this.orders = [];
  // }

  // AdminService removed: stub update
  updateStatus(order: any) {
    console.log(`Order #${order.id} status updated to ${order.status}`);
  }
}
