import { TestBed } from '@angular/core/testing';

import { JdCandidateService } from './jd-candidate.service';

describe('JdCandidateService', () => {
  let service: JdCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JdCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
