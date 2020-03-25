import { TestBed } from '@angular/core/testing';

import { CazareService } from './cazare.service';

describe('CazareService', () => {
  let service: CazareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CazareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
