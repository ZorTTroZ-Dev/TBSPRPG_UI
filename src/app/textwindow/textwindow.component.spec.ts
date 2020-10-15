import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextwindowComponent } from './textwindow.component';

describe('TextwindowComponent', () => {
  let component: TextwindowComponent;
  let fixture: ComponentFixture<TextwindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextwindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
