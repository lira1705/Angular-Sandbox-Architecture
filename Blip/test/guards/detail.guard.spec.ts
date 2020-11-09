import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BotModel } from 'src/app/shared/models/bot.model';
import { DetailGuard } from '.././../src/app/guards/detail.guard';
import { BotDetailService } from '.././../src/app/shared/services/bot-detail.service';
import botJson from './resources/bot.json';

describe('DetailGuard', () => {
  const NAVIGATE = 'navigate';

  let router: Router;
  let detailGuard: DetailGuard;
  let botDetailService: BotDetailService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        DetailGuard,
        BotDetailService
      ]
    }).compileComponents();

    detailGuard = TestBed.inject(DetailGuard);
    botDetailService = TestBed.inject(BotDetailService);
    router = TestBed.get(Router);
  });

  it('should test if can be activated', () => {
    const navigateSpy = spyOn(router, NAVIGATE);
    const bot = BotModel.fromObject(botJson);
    botDetailService.setBot(bot);

    const authorized = detailGuard.canActivate();

    expect(authorized).toBeTruthy();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should test if can not be activated', () => {
    const navigateSpy = spyOn(router, NAVIGATE);

    const authorized = detailGuard.canActivate();

    expect(authorized).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalled();
  });
})