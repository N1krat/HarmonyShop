import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { LessonsBodyComponent } from '../body/body.component';

@Component({
  selector: 'app-lessons-connector',
  template: `
    <app-shared-header></app-shared-header>
    <div class="page-shell">
      <app-lessons-body></app-lessons-body>
    </div>
    <app-shared-footer></app-shared-footer>
  `,
  standalone: true,
  imports: [SharedHeaderComponent, LessonsBodyComponent, SharedFooterComponent]
})
export class LessonsConnectorComponent {}
