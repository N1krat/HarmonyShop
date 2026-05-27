import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { LearningBodyComponent } from '../body/body.component';

@Component({
  selector: 'app-learning-connector',
  standalone: true,
  template: `
    <app-shared-header></app-shared-header>
    <app-learning-body></app-learning-body>
    <app-shared-footer></app-shared-footer>
  `,
  imports: [
    SharedHeaderComponent,
    LearningBodyComponent,
    SharedFooterComponent
  ]
})
export class LearningConnectorComponent {}
