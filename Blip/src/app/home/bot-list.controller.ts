import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BotModel } from '../shared/models/bot-list.model';

export enum ListOrder {
  ORDER_BY_DATE = 'date',
  ORDER_BY_NAME = 'name'
}

export enum ListMode {
  CARDS = 'cards',
  LIST = 'list'
}

@Injectable()
export class BotListController {

  private readonly favoriteListSubject: Subject<BotModel[]> = new Subject<BotModel[]>();
  private readonly notFavoriteListSubject: Subject<BotModel[]> = new Subject<BotModel[]>();
  private readonly isListModeSubject: Subject<boolean> = new Subject<boolean>();
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

  public setIsListMode(listMode: ListMode): void {
    if (listMode !== ListMode.LIST) {
      this.isListModeSubject.next(false);
    } else {
      this.isListModeSubject.next(true);
    }
  }

  public setBotList(botList: BotModel[]): void {
    this.botList = botList;
    this.favoriteList = this.botList.filter(item => item.favorite === true) || [];
    this.notFavoriteList = this.botList.filter(item => item.favorite !== true) || [];
    this.sortLists();
    this.isListModeSubject.next(true);
    this.favoriteListSubject.next(this.favoriteList);
    this.notFavoriteListSubject.next(this.notFavoriteList);
  }

  public setFavorite(bot: BotModel): void {
    bot.favorite = true;
    this.notFavoriteList = this.notFavoriteList.filter(item => item.id !== bot.id);
    this.favoriteList.push(bot);
    if (this.listOrderView === ListOrder.ORDER_BY_DATE) {
      this.favoriteList = this.orderByDate(this.favoriteList);
    } else {
      this.favoriteList = this.orderByName(this.favoriteList);
    }
    this.notFavoriteListSubject.next(this.notFavoriteList);
    this.favoriteListSubject.next(this.favoriteList);
  }

  public unsetFavorite(bot: BotModel): void { 
    bot.favorite = false;
    this.favoriteList = this.favoriteList.filter(item => item.id !== bot.id);
    this.notFavoriteList.push(bot);
    if (this.listOrderView === ListOrder.ORDER_BY_DATE) {
      this.notFavoriteList = this.orderByDate(this.notFavoriteList);
    } else {
      this.notFavoriteList = this.orderByName(this.notFavoriteList);
    }
    this.notFavoriteListSubject.next(this.notFavoriteList);
    this.favoriteListSubject.next(this.favoriteList);
  }

  public orderListsByDate(): void {
    if (this.favoriteList) {
      this.favoriteList = this.orderByDate(this.favoriteList);
      this.favoriteListSubject.next(this.favoriteList);
    }
    if (this.notFavoriteList) {
      this.notFavoriteList = this.orderByDate(this.notFavoriteList);
      this.notFavoriteListSubject.next(this.notFavoriteList);
    }
  }

  public orderListsByName(): void {
    if (this.favoriteList) {
      this.favoriteList = this.orderByName(this.favoriteList);
      this.favoriteListSubject.next(this.favoriteList);
    }
    if (this.notFavoriteList) {
      this.notFavoriteList = this.orderByName(this.notFavoriteList);
      this.notFavoriteListSubject.next(this.notFavoriteList);
    }
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
      return bot1.created.getTime() - bot2.created.getTime();
    });
  }

  public sortLists(): void {
    const processAction = this.map.get(this.listOrderView);

    if (processAction) {
      processAction();
    }
  }

  private createListOrderMap():void {
    this.map.set(ListOrder.ORDER_BY_DATE, this.orderListsByDate.bind(this));
    this.map.set(ListOrder.ORDER_BY_NAME, this.orderListsByName.bind(this));
  }

  public setListOrder(order: ListOrder): void {
    this.listOrderView = order;
    this.sortLists();
  }
}