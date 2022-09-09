import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../services/user';

interface DialogData {
  user: User
}

@Component({
  selector: 'app-delete-user-confirm-dialog',
  templateUrl: './delete-user-confirm-dialog.component.html',
  styleUrls: ['./delete-user-confirm-dialog.component.scss']
})
export class DeleteUserConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
  }

  onAbortClick(): void {
    this.dialogRef.close();
  }

}
