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
    console.log('🔥 BUTTON CLICKED');

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log('LOGIN SUCCESS:', res);

        if (res?.token) {
          this.router.navigate(['/home']); 
        }
      },
      error: (err) => {
        console.log('LOGIN ERROR:', err);
        this.error = err?.error?.error || 'Invalid credentials';
      }
    });
  }
}