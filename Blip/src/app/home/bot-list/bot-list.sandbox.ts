import {BotListService} from '../../shared/services/bot-list.service';
import { Injectable } from '@angular/core';
import { BotListController } from '../bot-list.controller';
import { Observable } from 'rxjs';
import { BotModel } from '../../shared/models/bot-list.model';
import { ListOrder } from '../bot-list.controller';

@Injectable()
export class BotListSandbox {

  constructor(
    private botListService: BotListService,
    private botListController: BotListController 
  ) {
  }

  public requestBotList() {
    this.botListController.setBotList(this.botListService.getBotList());
  }

  public getFavoriteBotList(): Observable<BotModel[]>  {
    return this.botListController.subscribeFavoriteList();
  }

  public getNotFavoriteBotList(): Observable<BotModel[]>  {
    return this.botListController.subscribeNotFavoriteList();
  }

  public setFavorite(bot: BotModel): void {
    this.botListController.setFavorite(bot);
  }

  public unsetFavorite(bot: BotModel): void {
    this.botListController.unsetFavorite(bot);
  }

  public setListOrder(order: ListOrder): void {
    this.botListController.setListOrder(order);
  }
}