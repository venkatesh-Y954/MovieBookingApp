import { TestBed } from '@angular/core/testing';

import { CustomerroleGuard } from './customerrole.guard';

describe('CustomerroleGuard', () => {
  let guard: CustomerroleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerroleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
