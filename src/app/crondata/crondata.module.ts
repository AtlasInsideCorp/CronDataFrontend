import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import {LayoutModule} from '../layout/layout.module';
import {SyspenSharedModule} from '../shared/shared.module';
import { AlertManagerComponent } from './alert/alert-manager/alert-manager.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import {CrondataRoutingModule} from './crondata-routing.module';
import {CrondataComponent} from './crondata.component';
import {IframeViewComponent} from './iframe-view/iframe-view.component';
import {TargetDeleteDialogComponent} from './target-management/target-delete-dialog.component';
import {TargetUpdateComponent} from './target-management/target-update.component';
import {TargetComponent} from './target-management/target.component';


@NgModule({
  declarations: [
    CrondataComponent,
    IframeViewComponent,
    TargetComponent,
    TargetUpdateComponent,
    TargetDeleteDialogComponent,
    AppSettingsComponent
  ],
  imports: [
    SyspenSharedModule,
    LayoutModule,
    RouterModule,
    CrondataRoutingModule,
    NgSelectModule
  ],
})
export class CrondataModule {
}
