import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplicationsComponent } from './explications.component';

describe('ExplicationsComponent', () => {
  let component: ExplicationsComponent;
  let fixture: ComponentFixture<ExplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
