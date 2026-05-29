import { ApplicationRef, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppLanguage, LanguageService } from './language.service';

type TranslationMap = Record<string, unknown>;

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private readonly appRef = inject(ApplicationRef);

  private readonly cache = new Map<AppLanguage, TranslationMap>();
  private readonly readySubject = new BehaviorSubject<boolean>(false);
  readonly translationsReady$ = this.readySubject.asObservable();

  constructor() {
    this.languageService.language$.subscribe((lang) => {
      this.loadLanguage(lang).subscribe();
    });
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const lang = this.languageService.currentLanguage;
    const map = this.cache.get(lang);
    if (!map) {
      return key;
    }
    const value = this.resolveKey(map, key);
    if (typeof value !== 'string') {
      return key;
    }
    if (!params) {
      return value;
    }
    return Object.entries(params).reduce(
      (text, [k, v]) => text.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v)),
      value
    );
  }

  preload(lang: AppLanguage): Observable<void> {
    return this.loadLanguage(lang);
  }

  notifyUpdated(): void {
    this.readySubject.next(true);
    this.appRef.tick();
  }

  loadLanguage(lang: AppLanguage): Observable<void> {
    if (this.cache.has(lang)) {
      this.notifyUpdated();
      return of(void 0);
    }
    return this.http.get<TranslationMap>(`/assets/i18n/${lang}.json`).pipe(
      tap((data) => {
        this.cache.set(lang, data);
        this.notifyUpdated();
      }),
      catchError(() => {
        this.cache.set(lang, {});
        this.notifyUpdated();
        return of(void 0);
      }),
      map(() => void 0)
    );
  }

  private resolveKey(obj: TranslationMap, key: string): unknown {
    return key.split('.').reduce<unknown>((acc, part) => {
      if (acc && typeof acc === 'object' && part in (acc as TranslationMap)) {
        return (acc as TranslationMap)[part];
      }
      return undefined;
    }, obj);
  }
}
