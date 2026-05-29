import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

export interface LearningInstrument {
  id: number;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
}

export interface LessonItem {
  id: number;
  titleKey: string;
  videoUrl: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface LearningContent {
  instruments: LearningInstrument[];
  lessonsByInstrument: Record<string, LessonItem[]>;
}

@Injectable({ providedIn: 'root' })
export class LearningContentService {
  private readonly http = inject(HttpClient);
  private content$?: Observable<LearningContent>;

  getContent(): Observable<LearningContent> {
    if (!this.content$) {
      this.content$ = this.http.get<LearningContent>('/assets/learning/content.json').pipe(
        catchError(() =>
          of({
            instruments: [],
            lessonsByInstrument: {}
          })
        ),
        shareReplay(1)
      );
    }
    return this.content$;
  }

  getInstruments(): Observable<LearningInstrument[]> {
    return this.getContent().pipe(map((c) => c.instruments));
  }

  getLessons(instrumentId: number): Observable<LessonItem[]> {
    return this.getContent().pipe(
      map((c) => c.lessonsByInstrument[String(instrumentId)] ?? [])
    );
  }

  getInstrumentById(id: number): Observable<LearningInstrument | undefined> {
    return this.getInstruments().pipe(map((list) => list.find((i) => i.id === id)));
  }

  /** Extract YouTube video id from full URL, embed URL, or raw id */
  extractVideoId(videoUrl: string): string {
    const trimmed = videoUrl.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
    ];
    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match?.[1]) {
        return match[1];
      }
    }
    return trimmed;
  }
}
