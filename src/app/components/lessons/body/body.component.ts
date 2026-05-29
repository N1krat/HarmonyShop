import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../../shared/translate.pipe';
import {
  LearningContentService,
  LearningInstrument,
  LessonItem
} from '../../core/services/learning-content.service';

@Component({
  selector: 'app-lessons-body',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class LessonsBodyComponent implements OnInit {
  instrument?: LearningInstrument;
  lessons: LessonItem[] = [];
  selectedLesson?: LessonItem;
  videoUrl: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private learningContent: LearningContentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const instrumentId = Number(params.get('id'));
      const navigation = (this.router as any).getCurrentNavigation();
      const stateInstrument = navigation?.extras?.state?.instrument as LearningInstrument | undefined;

      if (stateInstrument) {
        this.instrument = stateInstrument;
        this.loadLessons(instrumentId);
        return;
      }

      this.learningContent.getInstrumentById(instrumentId).subscribe((instrument) => {
        this.instrument = instrument ?? {
          id: instrumentId,
          nameKey: 'learning.instruments.unknown.name',
          descriptionKey: 'learning.instruments.unknown.desc',
          icon: '🎵',
          color: '#2b7a78'
        };
        this.loadLessons(instrumentId);
      });
    });
  }

  loadLessons(instrumentId: number): void {
    this.learningContent.getLessons(instrumentId).subscribe((lessons) => {
      this.lessons = lessons;
      if (lessons.length > 0) {
        this.selectLesson(lessons[0]);
      } else {
        this.selectedLesson = undefined;
        this.videoUrl = '';
      }
    });
  }

  selectLesson(lesson: LessonItem): void {
    this.selectedLesson = lesson;
    const videoId = this.learningContent.extractVideoId(lesson.videoUrl);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  goBack(): void {
    this.router.navigate(['/learning']);
  }

  instrumentTitleKey(): string {
    return this.instrument?.nameKey ?? 'learning.instruments.unknown.name';
  }

  getLevelClass(level: string): string {
    return `level-${level.toLowerCase()}`;
  }
}
