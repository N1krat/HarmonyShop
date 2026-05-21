import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-home-connector',
  template: `
    <app-shared-header></app-shared-header>
    <app-body></app-body>
    <app-shared-footer></app-shared-footer>
  `,
  standalone: true,  
  imports: [
    SharedHeaderComponent,
    BodyComponent,
    SharedFooterComponent
  ]
})

export class ProductPageConnectorComponent { }
