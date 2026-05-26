import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  searchProducts(query: string): Observable<any[]> {
    console.log('🔍 Searching products:', query);
    return this.http.get<any[]>(`http://localhost:3000/api/products/search?q=${encodeURIComponent(query)}`);
  }

  filterProducts(category?: string, minPrice?: number, maxPrice?: number): Observable<any[]> {
    console.log('🔍 Filtering products - category:', category, 'minPrice:', minPrice, 'maxPrice:', maxPrice);
    let url = 'http://localhost:3000/api/products/filter?';
    const params = [];

    if (category) {
      params.push(`category=${encodeURIComponent(category)}`);
    }
    if (minPrice !== undefined) {
      params.push(`minPrice=${minPrice}`);
    }
    if (maxPrice !== undefined) {
      params.push(`maxPrice=${maxPrice}`);
    }

    return this.http.get<any[]>(url + params.join('&'));
  }

  getCategories(): Observable<string[]> {
    console.log('📂 Fetching categories');
    return this.http.get<string[]>('http://localhost:3000/api/categories');
  }
}