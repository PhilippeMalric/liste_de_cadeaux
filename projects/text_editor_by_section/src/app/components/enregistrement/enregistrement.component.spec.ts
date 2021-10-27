import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrementComponent } from './enregistrement.component';

describe('EnregistrementComponent', () => {
  let component: EnregistrementComponent;
  let fixture: ComponentFixture<EnregistrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
