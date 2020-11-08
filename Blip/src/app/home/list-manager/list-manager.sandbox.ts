import { Injectable } from '@angular/core';
import { BotListController, ListMode } from '../bot-list.controller';
import { ListOrder } from '../bot-list.controller';
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