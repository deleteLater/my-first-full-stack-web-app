import {TestBed} from '@angular/core/testing';

import {HelperService} from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a password for a given length', () => {
    const pwdLength = 16;
    const pwd = service.generatePassword(pwdLength);
    expect(pwd.length).toBe(pwdLength);
  });
});
