import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { LessonsBodyComponent } from '../body/body.component';

@Component({
  selector: 'app-lessons-connector',
  standalone: true,
  template: `
    <app-shared-header></app-shared-header>
    <app-lessons-body></app-lessons-body>
    <app-shared-footer></app-shared-footer>
  `,
  imports: [
    SharedHeaderComponent,
    LessonsBodyComponent,
    SharedFooterComponent
  ]
})
export class LessonsConnectorComponent {}
