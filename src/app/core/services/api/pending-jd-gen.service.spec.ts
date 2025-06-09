import { TestBed } from '@angular/core/testing';
import { PendingJdService } from './pending-jd-gen.service';


describe('PendingJdGenService', () => {
  let service: PendingJdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingJdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
