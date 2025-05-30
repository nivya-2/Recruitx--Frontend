import { TestBed } from '@angular/core/testing';

import { AdminJobRequisitionsService } from './admin-job-requisitions.service';

describe('AdminJobRequisitionsService', () => {
  let service: AdminJobRequisitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminJobRequisitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
