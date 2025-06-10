import { TestBed } from '@angular/core/testing';

import { EmailTemplateServiceService } from './email-template-service.service';

describe('EmailTemplateServiceService', () => {
  let service: EmailTemplateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailTemplateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
