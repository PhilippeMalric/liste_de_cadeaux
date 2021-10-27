import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetImageComponent } from './projet-image.component';

describe('JeuGuessComponent', () => {
  let component: ProjetImageComponent;
  let fixture: ComponentFixture<ProjetImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetImageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
