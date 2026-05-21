import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedHeaderComponent,
    BodyComponent
  ],
   template: `
    <app-shared-header></app-shared-header>
    <app-body></app-body>
  `,
})
export class LoginConnectorComponent {

}

