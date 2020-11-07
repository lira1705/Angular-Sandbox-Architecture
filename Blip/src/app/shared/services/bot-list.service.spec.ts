import { TestBed } from '@angular/core/testing';

import { BotListService } from './bot-list.service';

describe('BotListService', () => {
  let service: BotListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
