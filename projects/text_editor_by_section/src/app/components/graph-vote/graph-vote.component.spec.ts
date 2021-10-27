import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphVoteComponent } from './graph-vote.component';

describe('GraphVoteComponent', () => {
  let component: GraphVoteComponent;
  let fixture: ComponentFixture<GraphVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
