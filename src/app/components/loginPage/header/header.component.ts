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
    this.isLogged = false;
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
