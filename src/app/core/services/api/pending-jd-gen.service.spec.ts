import { TestBed } from '@angular/core/testing';

import { PendingJdGenService } from './pending-jd-gen.service';

describe('PendingJdGenService', () => {
  let service: PendingJdGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingJdGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
