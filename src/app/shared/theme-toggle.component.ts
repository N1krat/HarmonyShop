import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../components/core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="theme-toggle-btn" (click)="toggleTheme()" [attr.aria-label]="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
      <span class="theme-icon" *ngIf="isDarkMode">🌙</span>
      <span class="theme-icon" *ngIf="!isDarkMode">☀️</span>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .theme-toggle-btn:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    :host-context(.dark-theme) .theme-toggle-btn:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .theme-icon {
      display: block;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDark: boolean) => {
      this.isDarkMode = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
