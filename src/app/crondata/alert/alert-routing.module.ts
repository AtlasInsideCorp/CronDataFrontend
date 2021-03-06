import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRouteAccessService} from '../../core/auth/user-route-access-service';
import {ADMIN_ROLE, USER_ROLE} from '../../shared/constants/global.constant';
import {AlertHistoryComponent} from './alert-history/alert-history.component';
import {AlertManagerComponent} from './alert-manager/alert-manager.component';
import {AlertFilebrowserComponent} from './alert-filebrowser/alert-filebrowser.component';

const routes: Routes = [
    {path: '', redirectTo: 'history'},
    {
      path: 'history',
      component: AlertHistoryComponent,
      canActivate: [UserRouteAccessService],
      data: {authorities: [USER_ROLE, ADMIN_ROLE]}
    },
    {
      path: 'view',
      component: AlertManagerComponent,
      canActivate: [UserRouteAccessService],
      data: {authorities: [USER_ROLE, ADMIN_ROLE]}
    },
    {
      path: 'frame/browser',
      component: AlertFilebrowserComponent,
      canActivate: [UserRouteAccessService],
      data: {authorities: [USER_ROLE, ADMIN_ROLE]}
    },
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertRoutingModule {
}

