import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ListMode } from '../../shared/enum/list-mode.enum';
import { ListOrder } from '../../shared/enum/list-order.enum';
import { BotModel } from '../../shared/models/bot.model';

@Injectable()
export class BotListController {

  private readonly favoriteListSubject: Subject<BotModel[]> = new Subject<BotModel[]>();
  private readonly notFavoriteListSubject: Subject<BotModel[]> = new Subject<BotModel[]>();
  private readonly isListModeSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private readonly map = new Map<string, () => void>();
  private botList: BotModel[] = [];
  private favoriteList: BotModel[] = [];
  private notFavoriteList: BotModel[] = [];
  private listOrderView: ListOrder = ListOrder.ORDER_BY_NAME;

  constructor() {
    this.createListOrderMap();
  }

  public subscribeFavoriteList(): Observable<BotModel[]> {
    return this.favoriteListSubject.asObservable();
  }

  public subscribeNotFavoriteList(): Observable<BotModel[]> {
    return this.notFavoriteListSubject.asObservable();
  }

  public subscribeIsListMode(): Observable<boolean> {
    return this.isListModeSubject.asObservable();
  }

  public setListOrder(order: ListOrder): void {
    this.listOrderView = order;
    this.sortLists();
  }

  private sortLists(): void {
    const processAction = this.map.get(this.listOrderView);

    if (processAction) {
      processAction();
    }
  }

  private createListOrderMap():void {
    this.map.set(ListOrder.ORDER_BY_DATE, this.orderListsByDate.bind(this));
    this.map.set(ListOrder.ORDER_BY_NAME, this.orderListsByName.bind(this));
  }

  public setListMode(listMode: ListMode): void {
    if (listMode !== ListMode.LIST) {
      this.isListModeSubject.next(false);
    } else {
      this.isListModeSubject.next(true);
    }
  }

  public setBotList(botList: BotModel[]): void {
    if(this.botList.length === 0) {
      this.botList = botList;
      this.botList = this.orderByName(this.botList);
      this.favoriteList = this.botList.filter(item => item.favorite === true) || [];
      this.notFavoriteList = this.botList.filter(item => item.favorite !== true) || [];
      this.isListModeSubject.next(true);
    }
    this.favoriteListSubject.next(this.favoriteList);
    this.notFavoriteListSubject.next(this.notFavoriteList);
  }

  public setFavorite(bot: BotModel): void {
    bot.favorite = true;
    this.shiftBot(bot, this.favoriteList, this.notFavoriteList);
  }

  public unsetFavorite(bot: BotModel): void { 
    bot.favorite = false;
    this.shiftBot(bot, this.notFavoriteList, this.favoriteList);
  }

  private shiftBot(bot: BotModel, toList: BotModel[], fromList: BotModel[]) {
    const index = fromList.findIndex(item => item.id === bot.id);
    fromList.splice(index, 1);
    toList.push(bot);
    if (this.listOrderView === ListOrder.ORDER_BY_DATE) {
      toList = this.orderByDate(toList);
    } else {
      toList = this.orderByName(toList);
    }
    this.updateLists(bot);
  }

  private updateLists(bot: BotModel): void { 
    this.updateBotList(bot);
    this.notFavoriteListSubject.next(this.notFavoriteList);
    this.favoriteListSubject.next(this.favoriteList);
  }

  private updateBotList(bot: BotModel): void {
    const botIndex = this.botList.findIndex(item => item.id === bot.id);
    this.botList[botIndex] = bot;
  }

  public orderListsByDate(): void {
    this.orderLists(this.orderByDate)
  }

  public orderListsByName(): void {
    this.orderLists(this.orderByName)
  }

  private orderLists(orderBy: (list: BotModel[]) => BotModel[]): void {
    if (this.favoriteList) {
      this.favoriteList = orderBy(this.favoriteList);
      this.favoriteListSubject.next(this.favoriteList);
    }
    if (this.notFavoriteList) {
      this.notFavoriteList = orderBy(this.notFavoriteList);
      this.notFavoriteListSubject.next(this.notFavoriteList);
    }
    this.botList = orderBy(this.botList);
  }

  private orderByName(list: BotModel[]): BotModel[] {
    return list.sort((bot1, bot2) => {
      if(bot1.name < bot2.name) { 
        return -1; 
      }
      if(bot1.name > bot2.name) { 
        return 1; 
      }
      return 0;
    });
  }

  private orderByDate(list: BotModel[]): BotModel[] {
    return list.sort((bot1, bot2) => {
      if(bot1.created === null || bot2.created === null) {

        if(bot1.created === null && bot2.created === null) {
          return 0;
        }

        if ( bot1.created === null) {
          return 1;
        }
  
        if (bot2.created === null) {
          return -1;
        }
      }
      return bot1.created.getTime() - bot2.created.getTime();
    });
  }

  public search(text: string): void {
    const searchString = text.toLowerCase();
    if (this.favoriteList) {
      this.favoriteList = this.botList.filter(item => {
        const name  = item.name.toLowerCase();
        return name.includes(searchString) && item.favorite;
      });
      this.favoriteListSubject.next(this.favoriteList);
    }
    if (this.notFavoriteList) {
      this.notFavoriteList = this.botList.filter(item => {
        const name  = item.name.toLowerCase();
        return name.includes(searchString) && !item.favorite;
      });
      this.notFavoriteListSubject.next(this.notFavoriteList);
    }
  }
}