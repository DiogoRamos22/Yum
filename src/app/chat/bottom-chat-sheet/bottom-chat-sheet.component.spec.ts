import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomChatSheetComponent } from './bottom-chat-sheet.component';

describe('BottomChatSheetComponent', () => {
  let component: BottomChatSheetComponent;
  let fixture: ComponentFixture<BottomChatSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomChatSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomChatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
