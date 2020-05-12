import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SimpleUserInfo} from './user.component';

@Component({
  selector: 'app-delete-user-dialog',
  template: `
    <h1 mat-dialog-title>DELETE</h1>
    <div mat-dialog-content>
      <h2>Are you sure to delete: </h2>
      <mat-list>
        <mat-list-item *ngFor="let userInfo of simpleUserInfo">
          <mat-icon svgIcon="{{userInfo.avatar}}" matListIcon></mat-icon>
          <h3 matLine> {{userInfo.name}} </h3>
          <p matLine>{{userInfo.description | stringTruncate}}</p>
        </mat-list-item>
      </mat-list>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="cancel()">CANCEL</button>
      <button mat-button cdkFocusInitial (click)="delete()">DELETE</button>
    </div>
  `,
  styles: []
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public simpleUserInfo: SimpleUserInfo[]
  ) {
    console.log(simpleUserInfo);
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  delete() {
    this.dialogRef.close(true);
  }
}
