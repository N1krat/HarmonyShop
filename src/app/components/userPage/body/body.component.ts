import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../../shared/translate.pipe';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-body',
  standalone: true,
  templateUrl: './body.html',
  styleUrls: ['./body.css'],
  imports: [CommonModule, RouterModule, TranslatePipe]
})
export class BodyComponent implements OnInit {
  email: string | null = null;
  userId: number | null = null;
  orders: any[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.getUserId();
    this.loadOrders();
  }

  getUserId() {
    this.userId = this.authService.getUserId();
    this.email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
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

  translateStatus(status: string | undefined): string {
    const keyMap: Record<string, string> = {
      Completed: 'profile.completed',
      Pending: 'profile.pending',
      Canceled: 'profile.canceled'
    };
    return this.translationService.translate(keyMap[status ?? ''] || 'profile.pending');
  }
}
