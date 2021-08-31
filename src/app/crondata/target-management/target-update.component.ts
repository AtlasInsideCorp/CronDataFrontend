import {HttpResponse} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {delay} from 'rxjs/operators';
import {CronToasrtService} from '../../shared/alert/cron-toasrt.service';
import {ITarget, Target} from './target.model';
import {TargetService} from './target.service';

@Component({
  selector: 'jhi-target-update',
  templateUrl: './target-update.component.html',
})
export class TargetUpdateComponent implements OnInit {
  @Input() target?: ITarget;
  @Output() targetUpdated = new EventEmitter<any>();
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    host: ['', [Validators.required]],
    job: [null, [Validators.required]],
    port: [],
    description: []
  });


  constructor(protected targetService: TargetService,
              public activeModal: NgbActiveModal,
              private sysToasrtService: CronToasrtService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.target) {
      this.updateForm(this.target);
    }
    this.editForm.get('host')?.valueChanges.pipe(delay(3000)).subscribe(value => {
      console.log('checking');
    });
  }

  updateForm(target: ITarget): void {
    this.editForm.patchValue({
      id: target.id,
      host: target.host,
      port: target.port,
      job: target.job,
      description: target.description,
    });
  }

  save(): void {
    this.isSaving = true;
    const target = this.createFromForm();
    console.log(target);
    if (target.id) {
      this.subscribeToSaveResponse(this.targetService.update(target));
    } else {
      this.subscribeToSaveResponse(this.targetService.create(target));
    }
  }

  private createFromForm(): { host?: string; description?: string; port: number, id: any; job: any } {
    return {
      ...new Target(),
      host: this.editForm.get(['host'])!.value,
      port: this.editForm.get(['port'])!.value,
      id: this.editForm.get(['id'])!.value,
      job: this.editForm.get(['job'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarget>>): void {
    result.subscribe(
      (response) => this.onSaveSuccess(response),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(response: HttpResponse<ITarget>): void {
    this.isSaving = false;
    this.targetUpdated.emit(response.body);
    this.activeModal.close();
    this.sysToasrtService.showSuccess('Target ' + (this.target?.id ? 'edited' : 'created') + ' successfully');
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.sysToasrtService.showError('Error', 'Error while trying to create a new Target');
  }
}
