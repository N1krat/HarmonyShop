import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../shared/translate.pipe';
import { LearningContentService, LearningInstrument } from '../../core/services/learning-content.service';

@Component({
  selector: 'app-learning-body',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class LearningBodyComponent implements OnInit {
  instruments: (LearningInstrument & { modules: number })[] = [];

  constructor(
    private router: Router,
    private learningContent: LearningContentService
  ) {}

  ngOnInit(): void {
    this.learningContent.getContent().subscribe((content) => {
      this.instruments = content.instruments.map((instrument) => ({
        ...instrument,
        modules: content.lessonsByInstrument[String(instrument.id)]?.length ?? 0
      }));
    });
  }

  selectInstrument(instrument: LearningInstrument): void {
    this.router.navigate(['/learning', instrument.id], { state: { instrument } });
  }
}
