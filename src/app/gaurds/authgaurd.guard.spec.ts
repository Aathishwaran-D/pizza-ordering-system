import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authgaurdGuard } from './authgaurd.guard';

describe('authgaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authgaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
