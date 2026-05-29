import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../shared/translate.pipe';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TranslatePipe],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent {
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService
  ) {}

  submitRegister() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.password) {
      this.error = this.translationService.translate('auth.errors.required');
      return;
    }

    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.success = this.translationService.translate('auth.success.registered');
        this.email = '';
        this.password = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.error || this.translationService.translate('auth.errors.registrationFailed');
      }
    });
  }
}
