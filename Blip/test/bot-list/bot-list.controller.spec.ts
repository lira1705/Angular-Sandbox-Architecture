import { BotListController } from 'src/app/home/bot-list/bot-list.controller';
import { BotModel } from 'src/app/shared/models/bot.model';
import botJson from './resources/bot.json';
import dataJson from './resources/data.json';
import searchJson from './resources/search.json';

describe('BotListController', () => {
  let controller: BotListController;
  let bot: BotModel;
  let botList: BotModel[];

  beforeEach(() => {
    controller = new BotListController();
    bot = BotModel.fromObject(botJson);
    botList = BotModel.fromList(dataJson);
  })

  it('should create an instance', () => {
    expect(controller).toBeTruthy();
  });

  it('should return favoriteList and notFavoriteList', () => {
    let favoriteList: BotModel[];
    let notFavoriteList: BotModel[];
    const resultNotFavoriteList = controller.orderByName(
      botList.filter(item => item.favorite !== true)
    );

    controller.subscribeFavoriteList().subscribe(botList => {
      favoriteList = botList;
    });

    controller.subscribeNotFavoriteList().subscribe(botList => {
      notFavoriteList = botList;
    });

    controller.setBotList(botList);

    expect(favoriteList).toEqual([]);
    expect(notFavoriteList).toEqual(resultNotFavoriteList);
  });

  it('should set and unset favorite', () => {
    let favoriteList: BotModel[];
    let notFavoriteList: BotModel[];
    const resultNotFavoriteList = controller.orderByName(botList);

    controller.subscribeFavoriteList().subscribe(botList => {
      favoriteList = botList;
    });

    controller.subscribeNotFavoriteList().subscribe(botList => {
      notFavoriteList = botList;
    });

    controller.setBotList(botList); 

    const notFavoriteFirstItem = resultNotFavoriteList[0];

    controller.setFavorite(notFavoriteFirstItem); 

    expect(favoriteList).toEqual([notFavoriteFirstItem]);
    expect(notFavoriteList).toEqual(resultNotFavoriteList.slice(1, botList.length));

    controller.unsetFavorite(favoriteList[0]);

    expect(favoriteList).toEqual([]);
    expect(notFavoriteList).toEqual(resultNotFavoriteList);
  });

  it('should search', () => {
    let notFavoriteList: BotModel[];
    const searchBot = BotModel.fromObject(searchJson);
    const searchString = 'dustin';

    controller.subscribeNotFavoriteList().subscribe(botList => {
      notFavoriteList = botList;
    });

    controller.setBotList(botList);
    controller.search(searchString);

    expect(notFavoriteList[0].name).toEqual([searchBot][0].name); 
  });
});