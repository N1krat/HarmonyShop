import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-cart-connector',
  template: `
    <app-shared-header></app-shared-header>
    <div class="page-shell">
      <app-body></app-body>
    </div>
    <app-shared-footer></app-shared-footer>
  `,
  standalone: true,
  imports: [SharedHeaderComponent, BodyComponent, SharedFooterComponent]
})
export class CartConnectorComponent {}
