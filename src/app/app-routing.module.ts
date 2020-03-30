import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './components/chat/chat.component';
import {LoginComponent} from './components/login/login.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: LoginComponent},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
  ]
})
export class AppRoutingModule { }
