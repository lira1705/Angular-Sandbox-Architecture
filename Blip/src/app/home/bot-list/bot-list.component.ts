import { Component, Input, OnInit } from '@angular/core';
import { BotModel } from 'src/app/shared/models/bot-list.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BotListSandbox } from './bot-list.sandbox';
import { ListOrder } from '../bot-list.controller';

@Component({
  selector: 'app-bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.scss']
})
export class BotListComponent implements OnInit {
  public favoriteBotList: BotModel[] = [];
  public notFavoriteBotList: BotModel[] = [];
  public isListView: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private botListSandbox: BotListSandbox
  ) {
    this.botListSandbox.getIsListMode().subscribe(isListView => {
      console.log(isListView);
      this.isListView = isListView;
    })
    this.botListSandbox.getFavoriteBotList().subscribe(botList => {
      this.favoriteBotList = botList;
    });
    this.botListSandbox.getNotFavoriteBotList().subscribe(botList => {
      this.notFavoriteBotList = botList;
    });
    this.botListSandbox.setupBotList();
  }

  ngOnInit(): void {
  }

  public transform(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  public displayCreated(date: Date): string {
    const monthFixer = 1;
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + monthFixer;
    const year = date.getUTCFullYear();
    return day + "/" + month + "/" + year;
  }

  public setFavorite(bot: BotModel): void {
    this.botListSandbox.setFavorite(bot);
  }

  public unsetFavorite(bot: BotModel): void {
    this.botListSandbox.unsetFavorite(bot);
  }
}
