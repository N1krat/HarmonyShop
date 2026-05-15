import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
    //    this.auth.isLoggedIn$.subscribe(status => {
    //      this.isLogged = status;
    //    });
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    // auth logout disabled — navigate home instead
    this.router.navigate(['/home']);
  }
}
