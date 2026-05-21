import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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

  constructor(private router: Router) {}

  submitLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    // AuthService removed: stub login
    if (credentials.email === 'admin' && credentials.password === 'admin') {
      setTimeout(() => {
        this.router.navigate(['/admin']);
      }, 0);
      return;
    }
    if (credentials.email && credentials.password) {
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 0);
    } else {
      this.error = 'Email sau parolă greșită!';
    }
  }
}
