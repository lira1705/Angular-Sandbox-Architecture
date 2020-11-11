import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailController } from './detail.controller';
import { BotDetailService } from '../shared/services/bot-detail.service';
import { BotModel} from '../shared/models/bot.model';

@Injectable()
export class DetailSandbox {

  constructor(
    private detailController: DetailController,
    private botDetailService: BotDetailService,
  ) {
  }

  public setupBot(): void {
    this.detailController.setBot(this.botDetailService.getBot());
  }

  public getBot(): Observable<BotModel> {
    return this.detailController.subscribeBot();
  }

  public getLanguage(region: string): string {
    return this.detailController.getLanguage(region);
  }
}