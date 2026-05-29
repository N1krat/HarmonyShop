import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { BodyComponent } from '../body/product-body.component';

@Component({
  selector: 'app-product-connector',
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
export class ProductConnectorComponent {}
