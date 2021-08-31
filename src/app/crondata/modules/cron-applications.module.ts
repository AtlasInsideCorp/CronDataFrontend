import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {SyspenSharedModule} from '../../shared/shared.module';
import {CronApplicationsRoutingModule} from './cron-applications-routing.module';
import {ModuleViewComponent} from './module-view/module-view.component';
import {CronAppCardComponent} from './shared/components/cron-app-card/cron-app-card.component';
import { CronAppInstallModalComponent } from './shared/components/cron-app-install-modal/cron-app-install-modal.component';


@NgModule({
  declarations: [ModuleViewComponent, CronAppCardComponent, CronAppInstallModalComponent],
    imports: [
        CommonModule,
        CronApplicationsRoutingModule,
        SyspenSharedModule,
        NgSelectModule
    ]
})
export class CronApplicationsModule {
}
