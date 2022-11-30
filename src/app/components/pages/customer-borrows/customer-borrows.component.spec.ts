import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBorrowsComponent } from './customer-borrows.component';

describe('CustomerBorrowsComponent', () => {
  let component: CustomerBorrowsComponent;
  let fixture: ComponentFixture<CustomerBorrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBorrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBorrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
