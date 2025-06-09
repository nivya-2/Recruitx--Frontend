import { TestBed } from '@angular/core/testing';

import { BulkUploadCandidatesService } from './bulk-upload-candidates.service';

describe('BulkUploadCandidatesService', () => {
  let service: BulkUploadCandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkUploadCandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
