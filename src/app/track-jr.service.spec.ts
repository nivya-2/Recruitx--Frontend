import { TestBed } from '@angular/core/testing';

import { TrackJrService } from './track-jr.service';

describe('TrackJrService', () => {
  let service: TrackJrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackJrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
