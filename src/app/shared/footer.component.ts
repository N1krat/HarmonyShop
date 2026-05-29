import { Component } from '@angular/core';
import { TranslatePipe } from './translate.pipe';

@Component({
  selector: 'app-shared-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [TranslatePipe]
})
export class SharedFooterComponent {}
