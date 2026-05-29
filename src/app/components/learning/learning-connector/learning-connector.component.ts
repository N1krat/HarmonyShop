import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { LearningBodyComponent } from '../body/body.component';

@Component({
  selector: 'app-learning-connector',
  template: `
    <app-shared-header></app-shared-header>
    <div class="page-shell">
      <app-learning-body></app-learning-body>
    </div>
    <app-shared-footer></app-shared-footer>
  `,
  standalone: true,
  imports: [SharedHeaderComponent, LearningBodyComponent, SharedFooterComponent]
})
export class LearningConnectorComponent {}
