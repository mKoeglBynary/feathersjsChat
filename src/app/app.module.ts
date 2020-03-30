import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
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

const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: LoginComponent}
];

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
    MessageInterfaceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
