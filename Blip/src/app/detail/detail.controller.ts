import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BotModel } from '../shared/models/bot.model';

@Injectable()
export class DetailController {

  private bot: BotModel;
  private botSubject: Subject<BotModel> = new Subject<BotModel>();
  private readonly map = new Map<string, string>();

  constructor() {
    this.createLanguageMap();
  }

  public setBot(bot: BotModel): void {
    this.bot = bot;
    this.botSubject.next(this.bot);
  }

  public subscribeBot(): Observable<BotModel>{
    return this.botSubject.asObservable();
  }

  public getLanguage(region: string): string {
    const language = this.map.get(region);
    if (language) {
      return language;
    }
  }

  private createLanguageMap():void {
    const PT_BR = 'pt-BR';
    const EN = 'en';
    const EUA = 'EUA - English (EN)';
    const BR = 'BR - Portuguese (PT-BR)';
    this.map.set(PT_BR, BR);
    this.map.set(EN, EUA);
  }
}