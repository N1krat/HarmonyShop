import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent {
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  submitRegister() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.password) {
      this.error = 'Email and password are required';
      return;
    }

    console.log('📝 Attempting registration for:', this.email);

    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('✅ Registration successful:', response);
        this.success = 'Registration successful! Redirecting to login...';
        this.email = '';
        this.password = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('❌ Registration failed:', err);
        this.error = err.error?.error || 'Registration failed. Please try again.';
      }
    });
  }
}