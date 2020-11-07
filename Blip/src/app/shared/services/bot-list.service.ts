import { Injectable } from '@angular/core';
import { BotModel } from '../models/bot-list.model'
import data from '../../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class BotListService {

  constructor() {
    this.getBotList();
  }

  public getBotList(): BotModel[] {
    return BotModel.fromList(data);
  }
}
