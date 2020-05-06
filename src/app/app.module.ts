import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ActiveUsersHeaderComponent } from './components/active-users-header/active-users-header.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { ChatComponent } from './components/chat/chat.component';
import { InputComponent } from './components/common/input/input.component';
import { LanguageSelectorComponent } from './components/common/language-selector/language-selector.component';

import { LoginComponent } from './components/login/login.component';
import { MessageInterfaceComponent } from './components/message-interface/message-interface.component';
import { MessageUserInputComponent } from './components/message-user-input/message-user-input.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsersInterfaceComponent } from './components/users-interface/users-interface.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { FEATHERS_APP_PROVIDER } from './provider/feathers-app.provider';
import { ActiveUserState } from './states/active-user.state';
import { ChatState } from './states/chat.state';
import { UserState } from './states/user.state';

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
    providers: [FEATHERS_APP_PROVIDER, ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
