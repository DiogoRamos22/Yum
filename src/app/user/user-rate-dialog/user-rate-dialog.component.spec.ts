import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRateDialogComponent } from './user-rate-dialog.component';

describe('UserRateDialogComponent', () => {
  let component: UserRateDialogComponent;
  let fixture: ComponentFixture<UserRateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
