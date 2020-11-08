import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BotModel } from '../shared/models/bot-list.model';
import { BotDetailService } from '../shared/services/bot-detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public bot: BotModel;

  constructor(
    private router: Router,
    private botDetailService: BotDetailService,
    private sanitizer: DomSanitizer,
  ) {
      this.bot = this.botDetailService.getBot();
   }

  ngOnInit(): void {
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
}
