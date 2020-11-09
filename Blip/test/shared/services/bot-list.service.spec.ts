import { BotModel } from 'src/app/shared/models/bot.model';
import { BotListService } from '../../../src/app/shared/services/bot-list.service';

describe('BotListService', () => {
  let service: BotListService;

  beforeEach(() => {
    service = new BotListService();
  })

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should return BotModel', () => {
    const botList = service.getBotList();
    expect(botList[0] instanceof BotModel).toBe(true, 'instance of BotModel');
  });
});