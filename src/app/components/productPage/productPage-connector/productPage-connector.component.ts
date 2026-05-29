import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { ProductDetailBodyComponent } from '../body/body.component';

@Component({
  selector: 'app-product-page-connector',
  template: `
    <app-shared-header></app-shared-header>
    <div class="page-shell">
      <app-product-detail-body></app-product-detail-body>
    </div>
    <app-shared-footer></app-shared-footer>
  `,
  standalone: true,
  imports: [SharedHeaderComponent, ProductDetailBodyComponent, SharedFooterComponent]
})
export class ProductPageConnectorComponent {}
