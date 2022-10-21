import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoursComponent } from './authorscomponent';

describe('BooksComponent', () => {
  let component: AuthoursComponent;
  let fixture: ComponentFixture<AuthoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
