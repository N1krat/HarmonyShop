import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrders() {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getOrdersByUserId(userId: number) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  createOrder(userId: number, total: number, products: any[]) {
    const orderData = {
      user_id: userId,
      total: total,
      products: products
    };
    return this.http.post(this.apiUrl, orderData);
  }

  updateOrderStatus(orderId: number, status: number) {
    return this.http.put(`${this.apiUrl}/${orderId}`, { status });
  }
}
