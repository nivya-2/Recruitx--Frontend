import { TestBed } from '@angular/core/testing';

import { XcelParserService } from './xcel-parser.service';

describe('XcelParserService', () => {
  let service: XcelParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XcelParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
