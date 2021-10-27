import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeCadeauxComponent } from './list-de-cadeaux.component';

describe('ListDeCadeauxComponent', () => {
  let component: ListDeCadeauxComponent;
  let fixture: ComponentFixture<ListDeCadeauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListDeCadeauxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeCadeauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
