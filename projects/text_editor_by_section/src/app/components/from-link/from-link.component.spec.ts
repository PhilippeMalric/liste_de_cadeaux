import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLinkComponent } from './from-link.component';

describe('FromLinkComponent', () => {
  let component: FromLinkComponent;
  let fixture: ComponentFixture<FromLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
