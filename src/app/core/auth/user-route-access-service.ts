import {Injectable, isDevMode} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CronToasrtService} from '../../shared/alert/cron-toasrt.service';
import {LoginModalService} from '../login/login-modal.service';
import {AccountService} from './account.service';
import {StateStorageService} from './state-storage.service';

@Injectable({providedIn: 'root'})
export class UserRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    private loginModalService: LoginModalService,
    private accountService: AccountService,
    private stateStorageService: StateStorageService,
    private toasrtService: CronToasrtService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const authorities = route.data?.authorities;
    // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
    // that the client has a principal too, if they already logged in by the server.
    // This could happen on a page refresh.
    return this.checkLogin(authorities, state.url);
  }

  checkLogin(authorities: string[], url: string): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (!authorities || authorities.length === 0) {
          return true;
        }

        if (account) {
          const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
          if (hasAnyAuthority) {
            return true;
          }
          if (isDevMode()) {
            console.error('User has not any of required authorities: ', authorities);
          }

          if (this.accountService.isAuthenticated()) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/auth']);
          }
          this.showError();
          return false;
        }

        // this.stateStorageService.storeUrl(url);
        this.showError();
        this.router.navigate(['/auth']);
        return false;
      })
    );
  }

  showError() {
    this.toasrtService.showError('Login to access', 'Does not have permissions to access to this resource');
  }
}
