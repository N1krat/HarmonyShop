import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../components/core/services/theme.service';
import { TranslatePipe } from './translate.pipe';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <button
      class="theme-toggle-btn"
      (click)="toggleTheme()"
      [attr.aria-label]="isDarkMode ? ('theme.switchToLight' | translate) : ('theme.switchToDark' | translate)"
    >
      <span class="theme-icon" *ngIf="isDarkMode">🌙</span>
      <span class="theme-icon" *ngIf="!isDarkMode">☀️</span>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      background: transparent;
      border: 1px solid var(--input-border);
      font-size: 18px;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 6px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .theme-toggle-btn:hover {
      background: var(--nav-hover-bg);
    }

    .theme-icon {
      display: block;
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe((isDark: boolean) => {
      this.isDarkMode = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
