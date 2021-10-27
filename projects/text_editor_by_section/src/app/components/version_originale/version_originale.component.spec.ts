import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionOriginaleComponent } from './version_originale.component';

describe('AddToDbComponent', () => {
  let component: VersionOriginaleComponent;
  let fixture: ComponentFixture<VersionOriginaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VersionOriginaleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionOriginaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
