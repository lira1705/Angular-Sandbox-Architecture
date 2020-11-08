import { TestBed } from '@angular/core/testing';

import { BotDetailService } from './bot-detail.service';

describe('BotDetailService', () => {
  let service: BotDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
