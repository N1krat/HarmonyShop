import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrders } from './admin-orders.component';

describe('Orders', () => {
  let component: AdminOrders;
  let fixture: ComponentFixture<AdminOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrders]
    })
    .compileComponents();

  fixture = TestBed.createComponent(AdminOrders);
  component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
