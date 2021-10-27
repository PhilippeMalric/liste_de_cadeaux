import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionNavComponent } from './proposition-nav.component';

describe('PropositionNavComponent', () => {
  let component: PropositionNavComponent;
  let fixture: ComponentFixture<PropositionNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropositionNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropositionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
