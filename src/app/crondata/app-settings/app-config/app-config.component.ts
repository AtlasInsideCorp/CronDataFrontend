import {Component, OnInit} from '@angular/core';
import {CronToasrtService} from '../../../shared/alert/cron-toasrt.service';
import {ConfigParamsService} from '../../../shared/services/config/config-params.service';
import {ConfigSectionService} from '../../../shared/services/config/config-section.service';
import {SectionConfigParamType} from '../../../shared/types/configuration/section-config-param.type';
import {SectionConfigType} from '../../../shared/types/configuration/section-config.type';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.scss']
})
export class AppConfigComponent implements OnInit {
  sections: SectionConfigType[] = [];
  private loading = true;
  confValid = true;
  saving: any;
  configToSave: SectionConfigParamType[] = [];

  constructor(private utmConfigSectionService: ConfigSectionService,
              private utmConfigParamsService: ConfigParamsService,
              private toastService: CronToasrtService) {
  }

  ngOnInit() {
    this.getSections();
  }

  getSections() {
    this.loading = true;
    this.utmConfigSectionService.query({page: 0, size: 10000, 'moduleNameShort.specified': false}).subscribe(response => {
      this.loading = false;
      if (response.body) {
        this.sections = response.body;
      }
    }, error => {
      this.toastService.showError('Error', 'Error getting application configurations sections');
    });
  }

}
