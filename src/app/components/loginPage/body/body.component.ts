import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../shared/translate.pipe';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, TranslatePipe],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService
  ) {}

  submitLogin() {
    if (!this.email || !this.password) {
      this.error = this.translationService.translate('auth.errors.required');
      return;
    }

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (res?.token) {
          const isAdmin = this.authService.isAdmin();
          this.router.navigate([isAdmin ? '/admin' : '/home']);
        }
      },
      error: (err) => {
        this.error = err?.error?.error || this.translationService.translate('auth.errors.invalidCredentials');
      }
    });
  }
}
