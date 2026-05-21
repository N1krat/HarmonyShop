import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    let stored: CartItem[] = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('cart');
      stored = data ? JSON.parse(data) : [];
    }
    this.cartSubject.next(stored);
  }

  private saveCart(items: CartItem[]) {
    this.cartSubject.next(items);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }

  addToCart(item: CartItem) {
    const items = [...this.cartSubject.value];
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.saveCart(items);
  }

  removeFromCart(id: number) {
    const items = this.cartSubject.value.filter(i => i.id !== id);
    this.saveCart(items);
  }

  updateQuantity(id: number, quantity: number) {
    const items = [...this.cartSubject.value];
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart(items);
    }
  }

  clearCart() {
    this.saveCart([]);
  }

  getTotal() {
    return this.cartSubject.value.reduce((acc, i) => acc + i.price * i.quantity, 0);
  }
}
