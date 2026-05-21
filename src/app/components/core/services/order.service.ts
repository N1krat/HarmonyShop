import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  getOrders() {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
