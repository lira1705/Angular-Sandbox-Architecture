import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BotModel } from '../shared/models/bot-list.model';
import { DetailSandbox } from './detail.sandbox';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy {
  public bot: BotModel;
  public activeUsers:number;
  public receivedMessages:number;
  public sentMessages: number;
  public language: string;
  public languageDetail: string;
  private botSubscription: Subscription;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private detailSandbox: DetailSandbox
  ) {
      this.botSubscription = this.detailSandbox.getBot().subscribe(bot => {
        this.bot = bot;
        console.log(this.bot.created.toTimeString());
        this.fillDetailFields();
      })
      this.detailSandbox.setupBot();
   }

  ngOnDestroy(): void {
    if (this.botSubscription) {
      this.botSubscription.unsubscribe();
    }
  }

  public changeRoute(): void {
    this.router.navigate(['']);
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

  private fillDetailFields(): void {
    const { analytics: { message, user}, culture } = this.bot;
    this.activeUsers = user.actived;
    this.receivedMessages = message.received;
    this.sentMessages = message.sent;
    this.languageDetail = this.detailSandbox.getLanguage(culture);
  }
}
