import { TestBed } from '@angular/core/testing';

import { DocExportService } from './doc-export.service';

describe('DocExportService', () => {
  let service: DocExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
