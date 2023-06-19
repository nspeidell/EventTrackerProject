import { TestBed } from '@angular/core/testing';

import { SpottingService } from './spotting.service';

describe('SpottingService', () => {
  let service: SpottingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpottingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
