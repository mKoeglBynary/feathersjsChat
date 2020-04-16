import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/authService/auth.service';
import {AuthFacade} from '../states/facade/authFacade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _authFacade: AuthFacade,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin();
  }

  async checkLogin(): Promise<boolean> {
    let isLoggedIn = false;

    if (localStorage.getItem('auth')) {
      this._authFacade.login();
      isLoggedIn = true;
    } else {
      this._authFacade.getLoggedIn().subscribe(loggedIn => {
        isLoggedIn = loggedIn;
      });

    }


    if (isLoggedIn) {return true; }

    await this._router.navigate(['']);
    return false;
  }

}
