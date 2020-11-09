import { Component, OnInit } from '@angular/core';
import { ListMode } from '../../shared/enum/list-mode.enum';
import { ListOrder} from '../../shared/enum/list-order.enum'; 
import { ListManagerSandbox } from './list-manager.sandbox';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {

  public searchText: string;

  constructor(
    private listManagerSandbox: ListManagerSandbox
  ) {
    this.searchText = this.listManagerSandbox.getSearchText();
   }

  ngOnInit(): void {
  }

  public orderByDate(): void {
    this.listManagerSandbox.setListOrder(ListOrder.ORDER_BY_DATE);
  }

  public orderByName(): void {
    this.listManagerSandbox.setListOrder(ListOrder.ORDER_BY_NAME);
  }

  public changeViewToList(): void {
    this.listManagerSandbox.setListMode(ListMode.LIST);
  }

  public changeViewToCards(): void {
    this.listManagerSandbox.setListMode(ListMode.CARDS);
  }

  public search(text: string): void {
    this.listManagerSandbox.search(text);
  }

}
