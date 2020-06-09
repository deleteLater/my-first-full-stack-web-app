import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '@modules/general/user/shared/user';
import {AccountService} from '@core/account.service';

@Component({
  selector: 'app-account-dialog',
  template: `
    <div fxLayout="row">
      <button mat-mini-fab color="" class="mat-elevation-z0, avatar-dialog" fxFlex="30">
        <mat-icon [svgIcon]="user.avatar"></mat-icon>
      </button>
      <div fxLayout="column" fxLayoutAlign="center center" fxFlex>
        <span class="user-name">{{user.name}}</span>
        <span class="email">{{user.email}}</span>
        <div fxLayout="row" fxLayoutAlign="space-between center" class="actions">
          <button mat-button color="accent" (click)="close(true)">Sign Out</button>
          <button mat-button cdkFocusInitial (click)="close()">Close</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .avatar-dialog {
      width: 86px;
      height: 86px;
    }

    .user-name {
      font-size: 16px;
      line-height: 22px;
      margin: 0;
      color: #202124;
      letter-spacing: .29px;
    }

    .email {
      color: #5f6368;
      font-size: 14px;
      line-height: 19px;
      letter-spacing: normal;
    }

    .actions {
      margin-top: 10px;
    }

    mat-icon {
      transform: scale(3);
    }
  `]
})
export class AccountDialogComponent implements OnInit {

  constructor(
    private account: AccountService,
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
  }

  ngOnInit(): void {
  }

  close(signOut: boolean = false) {
    if (signOut) {
      this.account.logout();
    }
    this.dialogRef.close();
  }
}
