import { TestBed } from '@angular/core/testing';
import { CandidateService1 } from './applicant-details.service';


describe('ApplicantDetailsService', () => {
  let service: CandidateService1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateService1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
