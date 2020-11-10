import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { GetHardCodedPipe } from 'src/app/shared/pipes/get-hardcodeds.pipe';
import { BotListSandbox } from 'src/app/home/bot-list/bot-list.sandbox';
import { BotListComponent } from 'src/app/home/bot-list/bot-list.component';
import { Sanitizer } from '@angular/core';
import { BotModel } from 'src/app/shared/models/bot.model';
import botListJson from './resources/data.json';
import botJson from './resources/bot.json';
import botWithoutCreatedAtJson from './resources/bot-without-created.json';

describe('BotListComponent', () => {
  const BOX_LIST_SANDBOX = 'BotListSandbox';

  const GET_IS_LIST_MODE = 'getIsListMode';
  const GET_FAVORITE_BOT_LIST = 'getFavoriteBotList';
  const GET_NOT_FAVORITE_BOT_LIST = 'getNotFavoriteBotList';
  const SETUP_BOT_LIST = 'setupBotList';
  const SET_FAVORITE = 'setFavorite';
  const UNSET_FAVORITE = 'unsetFavorite';

  let botListComponent: BotListComponent;
  let botListSandboxSpy: BotListSandbox;
  let botList: BotModel[];
  let bot: BotModel;
  let fixture: ComponentFixture<BotListComponent>;
  let isListViewSubject: Subject<Boolean>;
  let favoriteBotListSubject: Subject<BotModel[]>;
  let notFavoriteBotListSubject: Subject<BotModel[]>;

  beforeEach(() => {
    const botListSandboxMock = jasmine.createSpyObj(BOX_LIST_SANDBOX, [
      GET_IS_LIST_MODE,
      GET_FAVORITE_BOT_LIST,
      GET_NOT_FAVORITE_BOT_LIST,
      SETUP_BOT_LIST,
      SET_FAVORITE,
      UNSET_FAVORITE
    ]);

    TestBed.configureTestingModule({

      providers: [ 
        { provide: BotListSandbox, useValue: botListSandboxMock },
        { provide: Sanitizer, useValue: Sanitizer}
      ],
      declarations: [ BotListComponent, GetHardCodedPipe]
    }).compileComponents();


    botListSandboxSpy = TestBed.inject(BotListSandbox);
    fixture = TestBed.createComponent(BotListComponent);
    botListComponent = fixture.componentInstance;
    isListViewSubject = new Subject<Boolean>();
    favoriteBotListSubject = new Subject<BotModel[]>();
    notFavoriteBotListSubject = new Subject<BotModel[]>();
    botListSandboxSpy.getIsListMode = jasmine.createSpy().and.returnValue(isListViewSubject.asObservable());
    botListSandboxSpy.getFavoriteBotList = jasmine.createSpy().and.returnValue(favoriteBotListSubject.asObservable());
    botListSandboxSpy.getNotFavoriteBotList = jasmine.createSpy().and.returnValue(notFavoriteBotListSubject.asObservable());
    botListSandboxSpy.setupBotList = jasmine.createSpy();
    botList = BotModel.fromList(botListJson);
    bot = BotModel.fromObject(botJson);
  })

  it('should set list mode', () => {
    
    botListComponent.ngOnInit();
    
    isListViewSubject.next(true);
    expect(botListComponent.isListView).toEqual(true);
    isListViewSubject.next(false);
    expect(botListComponent.isListView).toEqual(false);
  });

  it('should set favorite and not favorite lists', () => {
    const favoriteBotList = botList.filter(item => item.favorite === true) || [];
    const notFavoriteBotList = botList.filter(item => item.favorite !== true) || [];

    botListComponent.ngOnInit();
    favoriteBotListSubject.next(favoriteBotList);
    notFavoriteBotListSubject.next(notFavoriteBotList);

    expect(botListComponent.favoriteBotList).toEqual(favoriteBotList);
    expect(botListComponent.notFavoriteBotList).toEqual(notFavoriteBotList);
  });

  it('should display created at message', () => {
    const createdAtMessage = botListComponent.displayCreated(bot.created);
    expect(createdAtMessage).toEqual('Created at 31/1/2020');
  });

  it('should display nothing on created at message', () => {
    const botWithoutCreatedAt = BotModel.fromObject(botWithoutCreatedAtJson);
    const createdAtMessage = botListComponent.displayCreated(botWithoutCreatedAt.created);
    expect(createdAtMessage).toEqual('');
  });
});