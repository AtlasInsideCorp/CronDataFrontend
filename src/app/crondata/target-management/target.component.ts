import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CronToasrtService} from '../../shared/alert/cron-toasrt.service';
import {ITEMS_PER_PAGE} from '../../shared/constants/pagination.constants';
import {SortEvent} from '../../shared/directives/sortable/type/sort-event';
import {PromQueryTargetsService} from '../../shared/services/prometheus/prom-query-targets.service';
import {ActiveTargetsType} from '../../shared/types/prometheus/targets/active-targets.type';
import {TargetHealthEnum} from '../../shared/types/prometheus/targets/enums/target-health.enum';
import {SortByType} from '../../shared/types/sort-by.type';
import {TargetDeleteDialogComponent} from './target-delete-dialog.component';
import {TargetUpdateComponent} from './target-update.component';
import {ITarget, Target} from './target.model';
import {TargetService} from './target.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
})
export class TargetComponent implements OnInit, OnDestroy {
  targets?: ITarget[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page = 0;
  request = {
    page: this.page,
    size: this.itemsPerPage,
    sort: 'id,asc',
    'host.contains': null
  };
  searchingTarget: any;
  fields: SortByType[] = [
    {
      fieldName: 'Default',
      field: 'id'
    },
    {
      fieldName: 'Host',
      field: 'host'
    },
    {
      fieldName: 'Job',
      field: 'job'
    }
  ];
  loading = true;
  targetHealthEnum = TargetHealthEnum;
  interval: any;

  constructor(
    private targetService: TargetService,
    private modalService: NgbModal,
    private sysToasrtService: CronToasrtService,
    private promQueryTargetsService: PromQueryTargetsService
  ) {
  }


  ngOnInit(): void {
    this.getTargets();
    this.interval = setInterval(() => this.getPromTargets(), 10000);
  }

  getTargets(): void {
    this.targetService
      .query(this.request)
      .subscribe(
        (res: HttpResponse<ITarget[]>) => {
          if (res.body) {
            this.onSuccess(res.body, res.headers);
          }
        },
        () => this.onError()
      );
  }

  getPromTargets() {
    this.promQueryTargetsService.query().subscribe(response => {
      if (response.body) {
        this.mergeTargetConfig(response.body.data.activeTargets);
      }
    }, error => this.sysToasrtService.showError('Metric collector is down',
      'Unable to connect with metric collector'));
  }

  onSort($event: SortEvent) {
    this.request.sort = $event.column + ',' + $event.direction;
    this.getTargets();
  }


  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  trackId(index: number, item: ITarget): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(target: ITarget): void {
    const modalRef = this.modalService.open(TargetDeleteDialogComponent,
      {centered: true, size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.target = target;
    modalRef.componentInstance.targetDeleted.subscribe(() => {
      this.getTargets();
    });
  }


  protected onSuccess(data: ITarget[], headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.targets = data;
    this.loading = false;
  }

  mergeTargetConfig(data: ActiveTargetsType[]) {
    // @ts-ignore
    for (const target of this.targets) {
      const instance = this.buildUrl(target);
      const job = target.job ? target.job : 'null';
      const index = data?.findIndex(value => value.labels.instance.includes(instance)
        && value.labels.job.includes(job));
      if (index !== -1) {
        target.health = data[index].health;
        target.lastError = data[index].lastError;
      } else {
        target.health = TargetHealthEnum.UNKNOWN;
        target.lastError = 'Unable to relate target';
      }
    }
    if (this.targets?.findIndex(value => value.health === this.targetHealthEnum.DOWN) !== -1) {
      this.sysToasrtService.showError('Target down', 'One or more targets are down');
    }
  }

  buildUrl(target: ITarget): string {
    return target.host + ':' + (target.port ? target.port : '80');
  }

  protected onError(): void {
    // this.ngbPaginationPage = this.page ?? 1;
  }

  createTarget() {
    const modalCreate = this.modalService.open(TargetUpdateComponent, {centered: true});
    modalCreate.componentInstance.targetUpdated.subscribe(() => {
      this.getTargets();
    });
  }

  searchTarget($event: any) {
    this.request['host.contains'] = $event;
    this.request.page = 0;
    this.getTargets();
  }

  editTarget(target: any) {
    const modalCreate = this.modalService.open(TargetUpdateComponent, {centered: true});
    modalCreate.componentInstance.target = target;
    modalCreate.componentInstance.targetUpdated.subscribe(() => {
      this.getTargets();
    });
  }


  trackIdentity(index: any, item: Target) {
    return item.id;
  }

  loadPage($event: number) {
    this.request.page = $event - 1;
    this.getTargets();
  }

  healthTooltip(target: Target & ITarget): string {
    switch (target.health) {
      case TargetHealthEnum.DOWN:
        return 'Error while trying to connect to target';
      case TargetHealthEnum.UP:
        return 'Target is connected ';
      case TargetHealthEnum.UNKNOWN:
        return 'Unable to related target';
      default:
        return 'Checking connection with target';
    }
  }

  healthClass(target: Target & ITarget): string {
    switch (target.health) {
      case TargetHealthEnum.DOWN:
        return 'label-light-danger';
      case TargetHealthEnum.UP:
        return 'label-light-success';
      case TargetHealthEnum.UNKNOWN:
        return 'label-light-info';
      default:
        return 'label-light-warning';
    }
  }

  getHealthLabel(target: Target & ITarget) {
    switch (target.health) {
      case TargetHealthEnum.DOWN:
        return 'Disconnected';
      case TargetHealthEnum.UP:
        return 'Connected';
      case TargetHealthEnum.UNKNOWN:
        return 'Unknown';
      default:
        return 'Checking';
    }
  }
}
