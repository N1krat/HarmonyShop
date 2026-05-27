import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lessons-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class LessonsBodyComponent implements OnInit {
  instrument: any;
  lessons: any[] = [];
  selectedLesson: any;
  videoUrl: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const instrumentId = Number(params.get('id'));
      
      // Try to get instrument from navigation state
      const navigation = (this.router as any).getCurrentNavigation();
      this.instrument = navigation?.extras?.state?.instrument;

      if (!this.instrument) {
        // Fallback: create a basic instrument object
        this.instrument = { id: instrumentId, name: 'Instrument', icon: '🎵' };
      }

      this.loadLessons(instrumentId);
    });
  }

  loadLessons(instrumentId: number): void {
    // Sample lessons data - in a real app, this would come from a backend
    const lessonsData: { [key: number]: any[] } = {
      1: [ // Guitar
        { id: 1, title: 'Basics & Guitar Parts', videoId: 'e9BWKhHMhIw', duration: '12:45', level: 'Beginner' },
        { id: 2, title: 'Holding the Guitar', videoId: 'dQw4w9WgXcQ', duration: '8:20', level: 'Beginner' },
        { id: 3, title: 'Basic Chords', videoId: 'jNQXAC9IVRw', duration: '15:30', level: 'Beginner' },
        { id: 4, title: 'Strumming Patterns', videoId: 'e9BWKhHMhIw', duration: '18:45', level: 'Intermediate' },
        { id: 5, title: 'Fingerpicking', videoId: 'dQw4w9WgXcQ', duration: '22:10', level: 'Intermediate' },
        { id: 6, title: 'Barre Chords', videoId: 'jNQXAC9IVRw', duration: '20:00', level: 'Intermediate' },
        { id: 7, title: 'Lead Guitar Basics', videoId: 'e9BWKhHMhIw', duration: '25:30', level: 'Advanced' },
        { id: 8, title: 'Complete Song', videoId: 'dQw4w9WgXcQ', duration: '30:00', level: 'Advanced' }
      ],
      2: [ // Piano
        { id: 1, title: 'Piano Keys & Layout', videoId: 'jNQXAC9IVRw', duration: '10:00', level: 'Beginner' },
        { id: 2, title: 'Hand Position', videoId: 'e9BWKhHMhIw', duration: '8:15', level: 'Beginner' },
        { id: 3, title: 'Reading Music Notes', videoId: 'dQw4w9WgXcQ', duration: '14:30', level: 'Beginner' },
        { id: 4, title: 'Basic Major Scales', videoId: 'jNQXAC9IVRw', duration: '16:45', level: 'Beginner' },
        { id: 5, title: 'Chord Construction', videoId: 'e9BWKhHMhIw', duration: '19:20', level: 'Intermediate' },
        { id: 6, title: 'Playing Melodies', videoId: 'dQw4w9WgXcQ', duration: '21:00', level: 'Intermediate' },
        { id: 7, title: 'Jazz Improvisation', videoId: 'jNQXAC9IVRw', duration: '28:30', level: 'Advanced' },
        { id: 8, title: 'Classical Piece', videoId: 'e9BWKhHMhIw', duration: '32:00', level: 'Advanced' },
        { id: 9, title: 'Advanced Techniques', videoId: 'dQw4w9WgXcQ', duration: '25:45', level: 'Advanced' },
        { id: 10, title: 'Performance Prep', videoId: 'jNQXAC9IVRw', duration: '20:15', level: 'Advanced' }
      ],
      3: [ // Violin
        { id: 1, title: 'Violin Parts Overview', videoId: 'e9BWKhHMhIw', duration: '9:00', level: 'Beginner' },
        { id: 2, title: 'Holding the Bow', videoId: 'dQw4w9WgXcQ', duration: '11:30', level: 'Beginner' },
        { id: 3, title: 'Proper Posture', videoId: 'jNQXAC9IVRw', duration: '13:00', level: 'Beginner' },
        { id: 4, title: 'First Notes', videoId: 'e9BWKhHMhIw', duration: '15:45', level: 'Beginner' },
        { id: 5, title: 'Vibrato Technique', videoId: 'dQw4w9WgXcQ', duration: '18:20', level: 'Intermediate' },
        { id: 6, title: 'Shifting Positions', videoId: 'jNQXAC9IVRw', duration: '20:00', level: 'Intermediate' },
        { id: 7, title: 'Classical Repertoire', videoId: 'e9BWKhHMhIw', duration: '24:30', level: 'Advanced' }
      ],
      4: [ // Drums
        { id: 1, title: 'Drum Kit Setup', videoId: 'dQw4w9WgXcQ', duration: '8:30', level: 'Beginner' },
        { id: 2, title: 'Grip & Technique', videoId: 'jNQXAC9IVRw', duration: '12:00', level: 'Beginner' },
        { id: 3, title: 'Basic Beats', videoId: 'e9BWKhHMhIw', duration: '16:45', level: 'Beginner' },
        { id: 4, title: 'Coordination Drills', videoId: 'dQw4w9WgXcQ', duration: '18:30', level: 'Intermediate' },
        { id: 5, title: 'Drum Fills', videoId: 'jNQXAC9IVRw', duration: '20:15', level: 'Intermediate' },
        { id: 6, title: 'Advanced Patterns', videoId: 'e9BWKhHMhIw', duration: '25:00', level: 'Advanced' }
      ],
      5: [ // Saxophone
        { id: 1, title: 'Saxophone Basics', videoId: 'jNQXAC9IVRw', duration: '10:30', level: 'Beginner' },
        { id: 2, title: 'Reed & Mouthpiece', videoId: 'e9BWKhHMhIw', duration: '12:00', level: 'Beginner' },
        { id: 3, title: 'First Sounds', videoId: 'dQw4w9WgXcQ', duration: '14:20', level: 'Beginner' },
        { id: 4, title: 'Fingering Chart', videoId: 'jNQXAC9IVRw', duration: '16:45', level: 'Beginner' },
        { id: 5, title: 'Tone Development', videoId: 'e9BWKhHMhIw', duration: '19:30', level: 'Intermediate' },
        { id: 6, title: 'Jazz Scales', videoId: 'dQw4w9WgXcQ', duration: '22:00', level: 'Intermediate' },
        { id: 7, title: 'Blues Improvisation', videoId: 'jNQXAC9IVRw', duration: '25:15', level: 'Advanced' },
        { id: 8, title: 'Advanced Techniques', videoId: 'e9BWKhHMhIw', duration: '28:00', level: 'Advanced' }
      ],
      6: [ // Flute
        { id: 1, title: 'Flute Assembly', videoId: 'dQw4w9WgXcQ', duration: '9:00', level: 'Beginner' },
        { id: 2, title: 'Embouchure', videoId: 'jNQXAC9IVRw', duration: '11:45', level: 'Beginner' },
        { id: 3, title: 'First Notes', videoId: 'e9BWKhHMhIw', duration: '13:30', level: 'Beginner' },
        { id: 4, title: 'Breathing Techniques', videoId: 'dQw4w9WgXcQ', duration: '15:00', level: 'Beginner' },
        { id: 5, title: 'Scales & Arpeggios', videoId: 'jNQXAC9IVRw', duration: '18:20', level: 'Intermediate' },
        { id: 6, title: 'Classical Pieces', videoId: 'e9BWKhHMhIw', duration: '22:00', level: 'Advanced' }
      ]
    };

    this.lessons = lessonsData[instrumentId] || [];
    if (this.lessons.length > 0) {
      this.selectLesson(this.lessons[0]);
    }
  }

  selectLesson(lesson: any): void {
    this.selectedLesson = lesson;
    // YouTube embedded URL format
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${lesson.videoId}`
    );
    console.log('📺 Selected lesson:', lesson.title);
  }

  goBack(): void {
    this.router.navigate(['/learning']);
  }

  getLevelClass(level: string): string {
    return `level-${level.toLowerCase()}`;
  }
}
