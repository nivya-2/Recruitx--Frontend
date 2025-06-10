import { TestBed } from '@angular/core/testing';

import { TrackJdService } from './track-jd.service';

describe('TrackJdService', () => {
  let service: TrackJdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackJdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
