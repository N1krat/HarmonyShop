import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../components/core/services/translation.service';
import { LanguageService } from '../components/core/services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private readonly translationService = inject(TranslationService);
  private readonly languageService = inject(LanguageService);

  transform(key: string, params?: Record<string, string | number>): string {
    // Read current language so impure pipe re-evaluates when language changes
    void this.languageService.currentLanguage;
    return this.translationService.translate(key, params);
  }
}
