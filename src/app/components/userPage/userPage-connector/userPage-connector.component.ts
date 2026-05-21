import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { SharedHeaderComponent } from '../../../shared/header.component';

@Component({
  selector: 'app-userPage-connector',
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
export class UserPageConnectorComponent { }

