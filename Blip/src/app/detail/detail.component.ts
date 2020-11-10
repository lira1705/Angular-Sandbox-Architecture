import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { BotModel } from '../shared/models/bot.model';
import { DetailSandbox } from './detail.sandbox';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy, OnInit {
  public bot: BotModel;
  public activeUsers:number;
  public receivedMessages:number;
  public sentMessages: number;
  public language: string;
  public languageDetail: string;
  private botSubscription: Subscription;

  constructor(
    private detailSandbox: DetailSandbox
  ) { }

  public ngOnInit(): void {
    this.botSubscription = this.detailSandbox.getBot().subscribe(bot => {
      this.bot = bot;
      this.fillDetailFields();
    })
    this.detailSandbox.setupBot();
  }

  public ngOnDestroy(): void {
    if (this.botSubscription) {
      this.botSubscription.unsubscribe();
    }
  }

  public displayCreated(date: Date | null): string {
    if(date === null) {
      return '';
    }
    const monthFixer = 1;
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + monthFixer;
    const year = date.getUTCFullYear();
    return `Created at ${day}/${month}/${year}`;
  }

  private fillDetailFields(): void {
    const { analytics: { message, user}, culture } = this.bot;
    this.activeUsers = user.actived;
    this.receivedMessages = message.received;
    this.sentMessages = message.sent;
    this.languageDetail = this.detailSandbox.getLanguage(culture);
  }
}
