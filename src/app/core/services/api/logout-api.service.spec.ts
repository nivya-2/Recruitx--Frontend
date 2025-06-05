import { TestBed } from '@angular/core/testing';

import { LogoutApiService } from './logout-api.service';

describe('LogoutApiService', () => {
  let service: LogoutApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
