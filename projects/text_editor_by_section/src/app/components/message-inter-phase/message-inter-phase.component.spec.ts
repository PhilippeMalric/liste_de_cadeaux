import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInterPhaseComponent } from './message-inter-phase.component';

describe('MessageInterPhaseComponent', () => {
  let component: MessageInterPhaseComponent;
  let fixture: ComponentFixture<MessageInterPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageInterPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInterPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
