import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotCardsComponent } from './bot-cards.component';

describe('BotCardsComponent', () => {
  let component: BotCardsComponent;
  let fixture: ComponentFixture<BotCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
