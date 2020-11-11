import { Component, OnDestroy, OnInit } from '@angular/core';
import { BotModel } from 'src/app/shared/models/bot.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BotListSandbox } from './bot-list.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BotDetailService } from 'src/app/shared/services/bot-detail.service';

@Component({
  selector: 'app-bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.scss']
})
export class BotListComponent implements OnDestroy, OnInit {
  public favoriteBotList: BotModel[] = [];
  public notFavoriteBotList: BotModel[] = [];
  public isListView: boolean;
  private isListSubscription: Subscription;
  private favoriteListSubscription: Subscription;
  private notFavoriteListSubscription: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private botListSandbox: BotListSandbox
  ) { }

  public ngOnInit(): void {
    this.isListSubscription = this.botListSandbox.getIsListMode().subscribe(isListView => {
      this.isListView = isListView;
    })
    this.favoriteListSubscription = this.botListSandbox.getFavoriteBotList().subscribe(botList => {
      this.favoriteBotList = botList;
    });
    this.notFavoriteListSubscription = this.botListSandbox.getNotFavoriteBotList().subscribe(botList => {
      this.notFavoriteBotList = botList;
    });
    this.botListSandbox.setupBotList();
  }

  ngOnDestroy(): void {
    if (this.isListSubscription) {
      this.isListSubscription.unsubscribe();
    }
    if (this.favoriteListSubscription) {
      this.favoriteListSubscription.unsubscribe();
    }
    if (this.notFavoriteListSubscription) {
      this.notFavoriteListSubscription.unsubscribe();
    }
  }

  public transform(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  public displayCreated(date: Date): string {
    const monthFixer = 1;
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + monthFixer;
    const year = date.getUTCFullYear();
    return `Created at ${day}/${month}/${year}`;
  }

  public setFavorite(bot: BotModel): void {
    this.botListSandbox.setFavorite(bot);
  }

  public unsetFavorite(bot: BotModel): void {
    this.botListSandbox.unsetFavorite(bot);
  }

  public gotToBotDetail(bot: BotModel): void {
    this.botListSandbox.gotToBotDetail(bot);
  }
}
