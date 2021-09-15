import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureEditSidebarComponent } from './adventure-edit-sidebar.component';

describe('AdventureEditSidebarComponent', () => {
  let component: AdventureEditSidebarComponent;
  let fixture: ComponentFixture<AdventureEditSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureEditSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureEditSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
