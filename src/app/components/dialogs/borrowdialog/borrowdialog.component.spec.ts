import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowdialogComponent } from './borrowdialog.component';

describe('BorrowdialogComponent', () => {
  let component: BorrowdialogComponent;
  let fixture: ComponentFixture<BorrowdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
