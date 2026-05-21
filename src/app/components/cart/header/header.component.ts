import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    // AuthService removed: set isLogged to false or implement logic if needed
    this.isLogged = false;
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    // AuthService removed: implement logout logic if needed
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
