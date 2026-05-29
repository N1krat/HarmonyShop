import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppLanguage = 'en' | 'ro' | 'ru';

const STORAGE_KEY = 'appLang';
const DEFAULT_LANG: AppLanguage = 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly languageSubject = new BehaviorSubject<AppLanguage>(this.getStoredLanguage());
  readonly language$ = this.languageSubject.asObservable();

  constructor() {
    this.updateDocumentLang(this.languageSubject.value);
  }

  get currentLanguage(): AppLanguage {
    return this.languageSubject.value;
  }

  setLanguage(lang: AppLanguage): void {
    this.languageSubject.next(lang);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, lang);
      }
    } catch {
      /* ignore */
    }
    this.updateDocumentLang(lang);
  }

  private getStoredLanguage(): AppLanguage {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'ro' || stored === 'ru') {
          return stored;
        }
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_LANG;
  }

  private updateDocumentLang(lang: AppLanguage): void {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {
      /* ignore */
    }
  }
}
