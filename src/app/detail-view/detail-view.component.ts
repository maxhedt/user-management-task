import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../services/user';
import {UserService} from '../services/user.service';
import {take} from 'rxjs';
import {DeleteUserConfirmDialogComponent} from './delete-user-confirm-dialog/delete-user-confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  public user: User | undefined;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // fetch user id from params
    this.route.params.subscribe(params => {
      const userId = +params['id'];

      if (!userId) return;

      // fetch user data
      this.userService.getUser(userId)
        .pipe(take(1))
        .subscribe(user => this.user = user);
    });
  }

  deleteUser() {
    this.openDeleteConfirmationDialog();
  }

  private openDeleteConfirmationDialog() {
    const dialogRef = this.dialog.open(DeleteUserConfirmDialogComponent, {
      width: '350px',
      data: {user: this.user},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRequest(); // only gets called if delete confirmation was positive
      }
    });
  }

  // execute delete request on backend and remove user from view on success
  private deleteRequest() {
    if (!this.user?.id) return;

    this.userService.deleteUser(this.user.id).pipe(take(1)).subscribe(isDeleted => {
      if (isDeleted) {
        this.router.navigate(['/'], {relativeTo: this.route});
      }
    });
  }
}
