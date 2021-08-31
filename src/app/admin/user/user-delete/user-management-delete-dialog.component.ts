import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {CronToasrtService} from '../../../shared/alert/cron-toasrt.service';


@Component({
  selector: 'app-ser-mgmt-delete-dialog',
  templateUrl: './user-management-delete-dialog.component.html'
})
export class UserMgmtDeleteDialogComponent {
  user!: User;
  @Output() userDeleted = new EventEmitter<string>();

  constructor(private userService: UserService,
              public activeModal: NgbActiveModal,
              private utmToast: CronToasrtService) {
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(login: any) {
    this.userService.delete(login).subscribe(response => {
      this.utmToast.showSuccess('User deleted successfully');
      this.activeModal.dismiss(true);
      this.userDeleted.emit('true');
    });
  }
}
