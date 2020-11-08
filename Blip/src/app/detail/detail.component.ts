import { Component, OnInit } from '@angular/core';
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
    private botDetailService: BotDetailService
  ) {
      this.bot = this.botDetailService.getBot();
   }

  ngOnInit(): void {
  }

  public changeRoute(): void {
    this.router.navigate(['']);
  }
}
