import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submitLogin() {
    console.log('🔥 LOGIN BUTTON CLICKED');
    console.log('📧 Email:', this.email);
    console.log('🔑 Password length:', this.password?.length || 0);

    if (!this.email || !this.password) {
      console.warn('⚠️ Email or password is empty');
      this.error = 'Email and password are required';
      return;
    }

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log('✅ FORM: Login response received:', res);

        if (res?.token) {
          // Check if user is admin
          const isAdmin = this.authService.isAdmin();
          console.log('👤 Is admin?:', isAdmin);
          
          if (isAdmin) {
            console.log('🛡️ Redirecting to admin panel...');
            this.router.navigate(['/admin']);
          } else {
            console.log('🏠 Redirecting to home...');
            this.router.navigate(['/home']);
          }
        }
      },
      error: (err) => {
        console.error('❌ FORM: Login error:', err);
        console.error('❌ FORM: Error status:', err?.status);
        console.error('❌ FORM: Error body:', err?.error);
        this.error = err?.error?.error || 'Invalid credentials';
      }
    });
  }
}