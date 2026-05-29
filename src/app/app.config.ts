import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TranslationService } from './components/core/services/translation.service';
import { LanguageService } from './components/core/services/language.service';

function initTranslations(
  translationService: TranslationService,
  languageService: LanguageService
): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      translationService.preload(languageService.currentLanguage).subscribe({
        next: () => resolve(),
        error: () => resolve()
      });
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslations,
      deps: [TranslationService, LanguageService],
      multi: true
    }
  ]
};
