import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule} from '@ngxs/store';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { MessageUserInputComponent } from './components/message-user-input/message-user-input.component';
import { ActiveUsersHeaderComponent } from './components/active-users-header/active-users-header.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { UsersInterfaceComponent } from './components/users-interface/users-interface.component';
import { MessageInterfaceComponent } from './components/message-interface/message-interface.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {ChatState} from './states/chatState';
import {UserState} from './states/userState';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {ActiveUserState} from './states/activeUserState';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    MessagesComponent,
    MessageComponent,
    MessageUserInputComponent,
    ActiveUsersHeaderComponent,
    ActiveUsersComponent,
    UsersInterfaceComponent,
    MessageInterfaceComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      ActiveUserState,
      ChatState,
      UserState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
