import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {first, map} from 'rxjs/operators';
import {AuthFacade} from '../states/facade/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _authFacade: AuthFacade,
    private readonly _router: Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin();
  }

  checkLogin(): Observable<boolean | UrlTree>  {
    if (localStorage.getItem('auth')) {
      this._authFacade.login();
    }

    return this._authFacade.getLoggedIn()
      .pipe(
        first(),
        map(loggedIn => {
          if (loggedIn) {
            return true;
          }
          return this._router.parseUrl('');
        }));
  }

}
