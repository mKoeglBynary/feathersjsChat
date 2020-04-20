import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './components/chat/chat.component';
import {LoginComponent} from './components/login/login.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuard} from './guards/auth.guard';


const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard], data: { animationState: 'chat'} },
  { path: '', component: LoginComponent, data: { animationState: 'login'}, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
