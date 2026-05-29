import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getStoredTheme());
  public darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.darkModeSubject.value);
  }

  private getStoredTheme(): boolean {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('darkMode');
        if (stored !== null) {
          return stored === 'true';
        }
      }
      // Default to dark mode (true = dark, false = light)
      // Only check system preference if no localStorage entry
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    } catch (e) {
      // Accessing localStorage or window may throw in some environments (SSR, strict CSP). Fall back to dark.
    }
    return true; // Default to dark theme
  }

  toggleTheme(): void {
    const newTheme = !this.darkModeSubject.value;
    this.darkModeSubject.next(newTheme);
    localStorage.setItem('darkMode', newTheme.toString());
    this.applyTheme(newTheme);
  }

  setTheme(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    localStorage.setItem('darkMode', isDark.toString());
    this.applyTheme(isDark);
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  private applyTheme(isDark: boolean): void {
    try {
      const html = (typeof document !== 'undefined' && document.documentElement) ? document.documentElement : null;
      const body = (typeof document !== 'undefined' && document.body) ? document.body : null;
      if (html) {
        html.setAttribute('data-theme', isDark ? 'dark' : 'light');
        html.classList.toggle('dark-theme', isDark);
        html.classList.toggle('light-theme', !isDark);
      }
      if (body) {
        body.classList.toggle('dark-theme', isDark);
        body.classList.toggle('light-theme', !isDark);
      }
    } catch (e) {
      // In environments without DOM (SSR), ignore.
    }
  }
}
