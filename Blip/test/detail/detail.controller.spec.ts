import { DetailController } from 'src/app/detail/detail.controller';
import { BotModel } from 'src/app/shared/models/bot.model';
import botJson from './resources/bot.json';

describe('DetailController', () => {
  let controller: DetailController;
  let bot: BotModel;

  beforeEach(() => {
    controller = new DetailController();
    bot = BotModel.fromObject(botJson);
  })

  it('should create an instance', () => {
    expect(controller).toBeTruthy();
  });

  it('should return Bot', () => {
    let botResult: BotModel;

    controller.subscribeBot().subscribe(bot => {
      botResult = bot;
    })

    controller.setBot(bot);

    expect(botResult).toEqual(bot);
  });
});