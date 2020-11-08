import { Component, OnInit } from '@angular/core';
import { ListMode, ListOrder } from '../bot-list.controller';
import { BotListSandbox } from '../bot-list/bot-list.sandbox';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {

  public searchText: string = '';

  constructor(
    private botListSandbox: BotListSandbox
  ) { }

  ngOnInit(): void {
  }

  public orderByDate(): void {
    this.botListSandbox.setListOrder(ListOrder.ORDER_BY_DATE);
  }

  public orderByName(): void {
    this.botListSandbox.setListOrder(ListOrder.ORDER_BY_NAME);
  }

  public changeViewToList(): void {
    this.botListSandbox.setListMode(ListMode.LIST);
  }

  public changeViewToCards(): void {
    this.botListSandbox.setListMode(ListMode.CARDS);
  }

  public search(text: string): void {
    this.botListSandbox.search(text);
  }

}
