import { TestBed } from '@angular/core/testing';

import { PartiiServiceService } from './partii-service.service';

describe('PartiiServiceService', () => {
  let service: PartiiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartiiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
