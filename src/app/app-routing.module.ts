import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './components/chat/chat.component';
import {LoginComponent} from './components/login/login.component';


const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: LoginComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
  ]
})
export class AppRoutingModule { }
