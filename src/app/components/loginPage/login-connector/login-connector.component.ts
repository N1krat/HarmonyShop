import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedHeaderComponent } from '../../../shared/header.component';
import { SharedFooterComponent } from '../../../shared/footer.component';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedHeaderComponent, BodyComponent, SharedFooterComponent],
  template: `
    <app-shared-header></app-shared-header>
    <div class="page-shell">
      <app-body></app-body>
    </div>
    <app-shared-footer></app-shared-footer>
  `
})
export class LoginConnectorComponent {}
