import { Injectable } from '@angular/core';
import { BotModel } from '../models/bot-list.model';

@Injectable({
  providedIn: 'root'
})
export class BotDetailService {

  private bot: BotModel;
  constructor() { }

  public setBot(bot: BotModel) {
    this.bot = bot;
  }

  public getBot(): BotModel {
    return this.bot;
  }
}
