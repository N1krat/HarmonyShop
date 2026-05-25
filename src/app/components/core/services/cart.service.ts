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
    console.log('🛒 CartService initialized');
    let stored: CartItem[] = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('cart');
      console.log('🛒 Stored cart data:', data);
      stored = data ? JSON.parse(data) : [];
      console.log('🛒 Loaded cart items:', stored);
    }
    this.cartSubject.next(stored);
  }

  private saveCart(items: CartItem[]) {
    console.log('🛒 Saving cart with items:', items);
    this.cartSubject.next(items);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(items));
      console.log('🛒 Cart saved to localStorage, total items:', items.length);
    }
  }

  addToCart(item: CartItem) {
    console.log('🛒 Adding to cart:', item);
    const items = [...this.cartSubject.value];
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
      console.log('🛒 Updated quantity for item', item.id, 'to', existing.quantity);
    } else {
      items.push(item);
      console.log('🛒 New item added to cart');
    }
    this.saveCart(items);
  }

  removeFromCart(id: number) {
    console.log('🛒 Removing item from cart:', id);
    const items = this.cartSubject.value.filter(i => i.id !== id);
    console.log('🛒 Remaining items after removal:', items.length);
    this.saveCart(items);
  }

  updateQuantity(id: number, quantity: number) {
    console.log('🛒 Updating quantity for item', id, 'to', quantity);
    const items = [...this.cartSubject.value];
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      console.log('🛒 Updated item quantity:', item.quantity);
      this.saveCart(items);
    } else {
      console.warn('🛒 Item not found:', id);
    }
  }

  clearCart() {
    console.log('🛒 Clearing cart');
    this.saveCart([]);
  }

  getTotal() {
    const total = this.cartSubject.value.reduce((acc, i) => acc + i.price * i.quantity, 0);
    console.log('🛒 Total price:', total);
    return total;
  }
}
