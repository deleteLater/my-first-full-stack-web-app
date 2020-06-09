import { TestBed } from '@angular/core/testing';

import { InternalFakeBackendInterceptor } from './internal-fake-backend.interceptor';

describe('InternalFakeBackendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InternalFakeBackendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InternalFakeBackendInterceptor = TestBed.inject(InternalFakeBackendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
