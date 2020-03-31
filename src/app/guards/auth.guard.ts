import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/authService/auth.service';
import {ActiveUserFacade} from '../states/facade/activeUserFacade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private activeUserFacade: ActiveUserFacade,
    private authService: AuthService,
    private router: Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  async checkLogin() {
    let isLoggedIn = false;
    this.activeUserFacade.getLoggedIn().subscribe( loggedIn => {
      isLoggedIn = loggedIn;
    });
    if (isLoggedIn) {return true; }

    await this.router.navigate(['']);
    return false;
  }

}
