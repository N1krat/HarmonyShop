import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppLanguage, LanguageService } from '../components/core/services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [FormsModule],
  template: `
    <select
      class="language-select"
      [ngModel]="currentLang"
      (ngModelChange)="onLanguageChange($event)"
      aria-label="Select language"
    >
      <option value="en">EN</option>
      <option value="ro">RO</option>
      <option value="ru">RU</option>
    </select>
  `
})
export class LanguageSelectorComponent implements OnInit {
  currentLang: AppLanguage = 'en';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.currentLanguage;
    this.languageService.language$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  onLanguageChange(lang: AppLanguage): void {
    this.languageService.setLanguage(lang);
  }
}
