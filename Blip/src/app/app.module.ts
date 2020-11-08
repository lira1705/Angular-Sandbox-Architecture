import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListManagerComponent } from './home/list-manager/list-manager.component';
import { BotListComponent } from './home/bot-list/bot-list.component';
import { BotListService } from './shared/services/bot-list.service';
import { BotListSandbox } from './home/bot-list/bot-list.sandbox';
import { BotListController } from './home/bot-list.controller';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { ListManagerSandbox } from './home/list-manager/list-manager.sandbox';
import { ListManagerController } from './home/list-manager/list-manager.controller';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListManagerComponent,
    BotListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    BotListService,
    BotListSandbox,
    BotListController,
    ListManagerSandbox,
    ListManagerController
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
