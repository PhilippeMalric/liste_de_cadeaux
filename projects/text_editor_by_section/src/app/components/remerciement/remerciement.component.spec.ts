import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemerciementComponent } from './remerciement.component';

describe('RemerciementComponent', () => {
  let component: RemerciementComponent;
  let fixture: ComponentFixture<RemerciementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemerciementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemerciementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
