import {BotListService} from '../../shared/services/bot-list.service';
import { Injectable } from '@angular/core';
import { BotListController } from './bot-list.controller';
import { Observable } from 'rxjs';
import { BotModel } from '../../shared/models/bot.model';
import { BotDetailService } from 'src/app/shared/services/bot-detail.service';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants/route-constants';

@Injectable()
export class BotListSandbox {

  constructor(
    private botListService: BotListService,
    private botListController: BotListController,
    private botDetailService: BotDetailService,
    private router: Router
  ) {
  }

  public setupBotList(): void {
    this.botListController.setBotList(this.botListService.getBotList());
  }

  public getFavoriteBotList(): Observable<BotModel[]>  {
    return this.botListController.subscribeFavoriteList();
  }

  public getNotFavoriteBotList(): Observable<BotModel[]>  {
    return this.botListController.subscribeNotFavoriteList();
  }

  public getIsListMode(): Observable<boolean>{
    return this.botListController.subscribeIsListMode();
  }

  public setFavorite(bot: BotModel): void {
    this.botListController.setFavorite(bot);
  }

  public unsetFavorite(bot: BotModel): void {
    this.botListController.unsetFavorite(bot);
  }

  public setBotDetail(bot: BotModel): void {
    this.botDetailService.setBot(bot);
    this.router.navigate([RouteConstants.DETAIL_ROUTE]);
  }
}