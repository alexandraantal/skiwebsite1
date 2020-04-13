import { TestBed } from '@angular/core/testing';

import { VremeService } from './vreme.service';

describe('VremeService', () => {
  let service: VremeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VremeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
