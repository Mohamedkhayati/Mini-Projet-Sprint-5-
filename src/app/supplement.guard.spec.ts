import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { supplementGuard } from './supplement.guard';

describe('supplementGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => supplementGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
