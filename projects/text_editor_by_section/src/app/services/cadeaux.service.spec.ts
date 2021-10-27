import { TestBed } from '@angular/core/testing';

import { CadeauxService } from './cadeaux.service';

describe('CadeauxService', () => {
  let service: CadeauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadeauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
