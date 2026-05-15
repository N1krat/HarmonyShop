import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// AuthService temporarily removed until restored

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [RouterLink, CommonModule]
})
export class HeaderComponent {
  isLogged = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // auth integration disabled until AuthService is restored
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.router.navigate(['/home']);
  }
}
