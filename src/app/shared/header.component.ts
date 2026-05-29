import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../components/core/services/auth.service';
import { ThemeToggleComponent } from './theme-toggle.component';
import { LanguageSelectorComponent } from './language-selector.component';
import { TranslatePipe } from './translate.pipe';

@Component({
  selector: 'app-shared-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ThemeToggleComponent,
    LanguageSelectorComponent,
    TranslatePipe
  ]
})
export class SharedHeaderComponent implements OnInit {
  isLogged = false;
  isAdmin = false;
  userEmail: string | null = null;
  searchQuery = '';

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

  logout() {
    this.authService.logout();
  }

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery }
      });
      this.searchQuery = '';
    }
  }

  onSearchKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
  }
}
