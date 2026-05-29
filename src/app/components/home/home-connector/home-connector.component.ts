import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { HomeBodyComponent } from '../body/home-body.component';

@Component({
  selector: 'app-home-connector',
  template: `
    <app-shared-header></app-shared-header>
    <div class="page-shell">
      <app-home-body></app-home-body>
    </div>
    <app-shared-footer></app-shared-footer>
  `,
  standalone: true,
  imports: [SharedHeaderComponent, HomeBodyComponent, SharedFooterComponent]
})
export class HomeConnectorComponent {}
