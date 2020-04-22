import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { MessageUserInputComponent } from './components/message-user-input/message-user-input.component';
import { UsersInterfaceComponent } from './components/users-interface/users-interface.component';
import { ActiveUsersHeaderComponent } from './components/active-users-header/active-users-header.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { MessageInterfaceComponent } from './components/message-interface/message-interface.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InputComponent } from './components/common/input/input.component';
import { LanguageSelectorComponent } from './components/common/language-selector/language-selector.component';
import {ChatState} from './states/chat.state';
import {UserState} from './states/user.state';
import {ActiveUserState} from './states/active-user.state';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

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
    PageNotFoundComponent,
    InputComponent,
    LanguageSelectorComponent,
    LocalizedDatePipe,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      ActiveUserState,
      ChatState,
      UserState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
