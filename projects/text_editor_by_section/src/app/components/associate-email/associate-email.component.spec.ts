import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateEmailComponent } from './associate-email.component';

describe('AssociateEmailComponent', () => {
  let component: AssociateEmailComponent;
  let fixture: ComponentFixture<AssociateEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
