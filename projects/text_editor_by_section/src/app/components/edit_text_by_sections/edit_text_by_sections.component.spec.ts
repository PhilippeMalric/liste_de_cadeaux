import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit_text_by_sectionsComponent } from './edit_text_by_sections.component';

describe('AddToDbUserComponent', () => {
  let component: Edit_text_by_sectionsComponent;
  let fixture: ComponentFixture<Edit_text_by_sectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Edit_text_by_sectionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_text_by_sectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
