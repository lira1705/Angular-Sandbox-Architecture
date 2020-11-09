import { BotModel } from 'src/app/shared/models/bot.model';
import { BotDetailService } from '../../../src/app/shared/services/bot-detail.service';
import botJson from './resources/bot.json';

describe('BotDetailService', () => {
  let service: BotDetailService;

  beforeEach(() => {
    service = new BotDetailService();
  })

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should return Bot', () => {
    const bot = BotModel.fromObject(botJson);
    service.setBot(bot);
    const botFromService = service.getBot();
    expect(botFromService).toEqual(bot);
  });

  it('should return undefined', () => {
    const botFromService = service.getBot();
    expect(botFromService).toEqual(undefined);
  });
});