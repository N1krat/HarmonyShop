import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learning-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class LearningBodyComponent implements OnInit {
  instruments: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadInstruments();
  }

  loadInstruments(): void {
    // Define popular musical instruments
    this.instruments = [
      {
        id: 1,
        name: 'Guitar',
        icon: '🎸',
        description: 'Learn to play acoustic and electric guitar',
        color: '#FF6B35',
        modules: 8
      },
      {
        id: 2,
        name: 'Piano',
        icon: '🎹',
        description: 'Master keyboard and piano techniques',
        color: '#004E89',
        modules: 10
      },
      {
        id: 3,
        name: 'Violin',
        icon: '🎻',
        description: 'Classical strings and advanced techniques',
        color: '#9D4EDD',
        modules: 7
      },
      {
        id: 4,
        name: 'Drums',
        icon: '🥁',
        description: 'Rhythm, beats, and percussion mastery',
        color: '#F72585',
        modules: 6
      },
      {
        id: 5,
        name: 'Saxophone',
        icon: '🎷',
        description: 'Jazz and classical saxophone lessons',
        color: '#FFC300',
        modules: 8
      },
      {
        id: 6,
        name: 'Flute',
        icon: '🪈',
        description: 'Wind instruments and breath control',
        color: '#00D9FF',
        modules: 6
      }
    ];
  }

  selectInstrument(instrument: any): void {
    console.log('📚 Learning selected:', instrument.name);
    this.router.navigate(['/learning', instrument.id], { state: { instrument } });
  }
}
