import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BotDetailService } from '../shared/services/bot-detail.service';

@Injectable({
  providedIn: 'root'
})
export class DetailGuard implements CanActivate {
  constructor(
    private botDetailService: BotDetailService,
    private router: Router
  ) {}

  public canActivate(): boolean {
    if (!this.botDetailService.getBot()) {
      this.router.navigate(['']);
      return false;
    }

    return Boolean(this.botDetailService.getBot())
  }
}
