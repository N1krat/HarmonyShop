
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;
  products: any[] = [];
  isCheckingOut = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    console.log('🛒 CartBodyComponent constructor called');
  }

  ngOnInit(): void {
    console.log('🛒 CartBodyComponent ngOnInit called');
    this.cartService.cart$.subscribe((items) => {
      console.log('🛒 Cart updated in component, items:', items);
      this.cartItems = items;
      this.calculateTotal();
      console.log('🛒 Total price calculated:', this.totalPrice);
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      console.log(`🛒 Item ${item.id}: MDL ${item.price} x ${item.quantity} = MDL ${itemTotal}`);
      return total + itemTotal;
    }, 0);
    console.log('🛒 Final total:', this.totalPrice);
  }

  increase(item: any) {
    console.log('🛒 Increasing quantity for item:', item.id, 'current:', item.quantity);
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decrease(item: any) {
    console.log('🛒 Decreasing quantity for item:', item.id, 'current:', item.quantity);
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  remove(item: any) {
    console.log('🛒 Removing item from cart:', item.id);
    this.cartService.removeFromCart(item.id);
  }

  checkout() {
    console.log('🛒 Checkout initiated, items:', this.cartItems);
    if (this.cartItems.length === 0) {
      console.warn('🛒 Cart is empty, cannot checkout');
      alert('Cart is empty');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn('🛒 User not logged in');
      alert('Please log in to checkout');
      this.router.navigate(['/login']);
      return;
    }

    this.isCheckingOut = true;
    console.log('🛒 Proceeding with checkout for user:', userId);

    const orderProducts = this.cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    this.orderService.createOrder(parseInt(userId), this.totalPrice, orderProducts).subscribe({
      next: (response: any) => {
        console.log('✅ 🛒 Order created successfully:', response);
        alert(`Order placed successfully! Order ID: ${response.orderId}`);
        this.cartService.clearCart();
        this.isCheckingOut = false;
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('❌ 🛒 Error creating order:', err);
        alert('Error placing order: ' + (err.error?.error || err.message));
        this.isCheckingOut = false;
      }
    });
  }
}
