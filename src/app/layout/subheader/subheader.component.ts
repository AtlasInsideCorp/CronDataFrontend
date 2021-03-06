// Angular
import {Component, OnInit} from '@angular/core';
import * as objectPath from 'object-path';
import {LayoutConfigService} from '../shared/services/layout-config.service';
import {HtmlClassService} from '../shared/services/html-class.service';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
})
export class SubheaderComponent implements OnInit {
  // Public properties
  // subheader layout
  layout = 'subheader-v3';
  width = 'fluid';
  clear = false;
  displayDesc = false;
  displayDaterangepicker = true;
  fixed = true;
  style = 'solid';
  subheaderClasses = '';
  subheaderContainerClasses = '';

  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   * @param uiService: HtmlClassService
   */
  constructor(private layoutConfigService: LayoutConfigService, private uiService: HtmlClassService) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    const config = this.layoutConfigService.getConfig();
    this.layout = objectPath.get(config, 'subheader.layout');
    this.fixed = objectPath.get(config, 'subheader.fixed');
    this.clear = objectPath.get(config, 'subheader.clear');
    this.style = objectPath.get(config, 'subheader.style');
    this.displayDesc = objectPath.get(config, 'subheader.displayDesc');
    this.displayDaterangepicker = objectPath.get(config, 'subheader.displayDaterangepicker');
    this.subheaderClasses = this.uiService.getClasses('subheader', true).toString();
    this.subheaderContainerClasses = this.uiService.getClasses('subheader_container', true).toString();
  }
}
