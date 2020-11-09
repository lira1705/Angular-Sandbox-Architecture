import { Injectable } from '@angular/core';
import { BotModel } from '../models/bot.model'
import data from '../../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class BotListService {

  private botList: BotModel[];

  constructor() {
    this.botList = this.extractBotList();
  }

  private extractBotList(): BotModel[] {
    return BotModel.fromList(data);
  }

  public getBotList(): BotModel[] {
    return this.botList;
  }
}
