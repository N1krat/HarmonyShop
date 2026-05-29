import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './components/core/services/theme.service';
import { TranslationService } from './components/core/services/translation.service';
import { LanguageService } from './components/core/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: []
})
export class App {
  protected readonly title = signal('HarmonyShop');

  constructor() {
    inject(ThemeService);
    inject(LanguageService);
    inject(TranslationService);
  }
}
