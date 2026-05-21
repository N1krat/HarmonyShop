import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, CommonModule]
})
export class SharedHeaderComponent {
  constructor(private router: Router) {}
  goLogin() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
