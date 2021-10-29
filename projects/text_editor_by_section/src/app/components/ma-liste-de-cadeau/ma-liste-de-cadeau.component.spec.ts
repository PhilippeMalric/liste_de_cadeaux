import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaListeDeCadeauComponent } from './ma-liste-de-cadeau.component';

describe('MaListeDeCadeauComponent', () => {
  let component: MaListeDeCadeauComponent;
  let fixture: ComponentFixture<MaListeDeCadeauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaListeDeCadeauComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaListeDeCadeauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
