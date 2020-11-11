import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { DetailComponent } from "src/app/detail/detail.component";
import { DetailSandbox } from 'src/app/detail/detail.sandbox';
import { BotModel } from 'src/app/shared/models/bot.model';
import { GetHardCodedPipe } from 'src/app/shared/pipes/get-hardcodeds.pipe';
import botJson from './resources/bot.json';

describe('DetailComponent', () => {
  const DETAIL_SANDBOX = 'DetailSandbox';
  const GET_BOT = 'getBot';
  const SETUP_BOT = 'setupBot';
  const GET_LANGUAGE = 'getLanguage';
  const languageDetail = 'BR - Portuguese (PT-BR)';

  let detailComponent: DetailComponent;
  let detailSandboxSpy: DetailSandbox;
  let bot: BotModel;
  let fixture: ComponentFixture<DetailComponent>;
  let botSubject: Subject<BotModel>;

  beforeEach(() => {
    const detailSandboxMock = jasmine.createSpyObj(DETAIL_SANDBOX, [
      GET_BOT,
      SETUP_BOT,
      GET_LANGUAGE
    ])

    TestBed.configureTestingModule({
      providers: [ {
        provide: DetailSandbox, useValue: detailSandboxMock
      }],
      declarations: [ DetailComponent, GetHardCodedPipe]
    }).compileComponents();

    detailSandboxSpy = TestBed.inject(DetailSandbox);
    bot = BotModel.fromObject(botJson);
    fixture = TestBed.createComponent(DetailComponent);
    detailComponent = fixture.componentInstance;
    botSubject = new Subject<BotModel>();
    detailSandboxSpy.getBot = jasmine.createSpy().and.returnValue(botSubject.asObservable());
    detailSandboxSpy.getLanguage = jasmine.createSpy().and.returnValue(languageDetail);
  })

  it('should fill detail fields', () => {
    detailComponent.ngOnInit();
    
    botSubject.next(bot);
    expect(detailComponent.activeUsers).toEqual(2);
    expect(detailComponent.receivedMessages).toEqual(10000);
    expect(detailComponent.sentMessages).toEqual(10001);
    expect(detailComponent.languageDetail).toEqual(languageDetail);
  });

  it('should display created at message', () => {
    const createdAtMessage = detailComponent.displayCreated(bot.created);
    expect(createdAtMessage).toEqual('Created at 31/1/2020');
  });
});