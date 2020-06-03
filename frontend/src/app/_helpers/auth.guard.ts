import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AccountService} from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private account: AccountService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.account.currentUser();

    if (user) {
      return true;
    }

    this.router.navigate(['authenticate'], {queryParams: {returnUrl: state.url}})
      .then(_ => 'navigate to login');
    return false;
  }
}
