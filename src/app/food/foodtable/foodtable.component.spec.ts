import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodtableComponent } from './foodtable.component';

describe('FoodtableComponent', () => {
  let component: FoodtableComponent;
  let fixture: ComponentFixture<FoodtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
