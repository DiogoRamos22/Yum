import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFoodComponent } from './profile-food.component';

describe('ProfileFoodComponent', () => {
  let component: ProfileFoodComponent;
  let fixture: ComponentFixture<ProfileFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
