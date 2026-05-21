import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-cart-connector',
  template: `
    <app-shared-header></app-shared-header>
    <app-body></app-body>
  `,
  standalone: true,  
  imports: [
    SharedHeaderComponent,
    BodyComponent,
  ]
})
export class CartConnectorComponent { }
