import { TestBed } from '@angular/core/testing';

import { JrApiService } from './jr-api.service';

describe('JrApiService', () => {
  let service: JrApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JrApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
