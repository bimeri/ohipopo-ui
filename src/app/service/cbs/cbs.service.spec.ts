import { TestBed } from '@angular/core/testing';

import { CbsService } from './cbs.service';

describe('CbsService', () => {
  let service: CbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
