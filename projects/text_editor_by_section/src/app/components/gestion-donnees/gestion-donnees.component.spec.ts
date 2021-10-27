import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDonneesComponent } from './gestion-donnees.component';

describe('GestionDonneesComponent', () => {
  let component: GestionDonneesComponent;
  let fixture: ComponentFixture<GestionDonneesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDonneesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
