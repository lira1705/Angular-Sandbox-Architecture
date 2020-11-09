import { Injectable } from '@angular/core';
import { ListMode } from '../../shared/enum/list-mode.enum';
import { ListOrder} from '../../shared/enum/list-order.enum'; 
import { BotListController } from '../bot-list/bot-list.controller';
import { ListManagerController } from './list-manager.controller';

@Injectable()
export class ListManagerSandbox {

  constructor(
    private botListController: BotListController ,
    private listManagerController: ListManagerController
  ) {
  }

  public setListOrder(order: ListOrder): void {
    this.botListController.setListOrder(order);
  }

  public setListMode(listMode: ListMode): void {
    this.botListController.setListMode(listMode);
  }

  public search(text: string): void {
    this.botListController.search(text);
    this.listManagerController.setSearchText(text);
  }

  public getSearchText(): string {
    return this.listManagerController.getSearchText();
  }
}