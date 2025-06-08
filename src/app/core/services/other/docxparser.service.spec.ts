import { TestBed } from '@angular/core/testing';

import { DocxParserService } from './docxparser.service';

describe('DocxparserService', () => {
  let service: DocxParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocxParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
