import { TestBed } from '@angular/core/testing';

import { BcraService } from './bcra.service';

describe('BcraService', () => {
  let service: BcraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BcraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
