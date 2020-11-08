import { Injectable } from '@angular/core';

@Injectable()
export class ListManagerController {

  private searchText: string = '';

  constructor() {
  }

  public getSearchText(): string {
    return this.searchText;
  }

  public setSearchText(text: string): void{
    this.searchText = text;
  }
}