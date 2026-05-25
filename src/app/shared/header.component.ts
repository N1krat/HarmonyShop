import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../components/core/services/auth.service'; // adjust path if needed

@Component({
  selector: 'app-shared-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, CommonModule]
})
export class SharedHeaderComponent implements OnInit {
  isLogged = false;
  isAdmin = false;
  userEmail: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLogged = status;
      this.isAdmin = this.authService.isAdmin();
    });

    this.authService.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });
  }

  goLogin() {
    if (this.isLogged) {
      // user already logged in
      this.router.navigate(['/profile']);
    } else {
      // user not logged in
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
  }
}