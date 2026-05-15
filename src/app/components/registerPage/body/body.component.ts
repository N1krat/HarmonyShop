import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// AuthService temporarily removed
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

  constructor(private router: Router) {}

  submitRegister() {
    // Registration stub while AuthService is unavailable
    this.success = 'User created (stub). You can now login.';
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }
}
