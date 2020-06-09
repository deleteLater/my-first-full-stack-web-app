import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from '@core/account.service';
import {User} from '@modules/general/user/shared/user';
import {MatDialog} from '@angular/material/dialog';
import {AccountDialogComponent} from './account-dialog.component';
import {SideNavService} from './shared/side-nav.service';

// noinspection CssUnusedSymbol
@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar class="mat-elevation-z4">
      <div class="icon-container" matRipple (click)="toggleSideNav()">
        <mat-icon>{{sidenav.opened() ? 'menu_open' : 'menu'}}</mat-icon>
      </div>
      <a routerLink="" style="text-decoration: none; color: #222b45; font-size: 36px"><h1>Welcome</h1></a>

      <div class="spacer"></div>

      <a mat-button routerLink="/pricing">PRICING</a>
      <a mat-button routerLink="/page-not-found">NOT FOUND</a>
      <a mat-button routerLink="/error">ERROR</a>
      <a mat-button (click)="toggleLoadingBar()">SLOW LOAD</a>
      <a mat-button href="https://github.com/deleteLater/my-first-full-stack-web-app" target="_blank">
        <div class="icon-text">
          <mat-icon svgIcon="github"></mat-icon>
          <span>GITHUB</span>
        </div>
      </a>
      <button mat-mini-fab color="" class="mat-elevation-z0, account-btn" (click)="openAccountCard()">
        <mat-icon [svgIcon]="currentUser.avatar"></mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`

    mat-toolbar {
      background-color: #fff;
      color: #222b45;
      position: relative;
      z-index: 1000;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .account-btn {
      font-size: small;
      margin-left: 3px;
    }

    .icon-container {
      padding: 0 24px;
      height: 100%;
      display: table;
    }

    .icon-container:hover {
      background-color: #F5F5F5;
    }

    mat-icon {
      display: table-cell;
      vertical-align: middle;
    }

    .mat-button:hover {
      background-color: #F5F5F5;
    }

    .mat-toolbar-single-row {
      padding-left: 0;
    }
  `]
})
export class NavComponent implements OnInit {

  @Output() showLoadingBarEvent = new EventEmitter();
  currentUser: User;

  constructor(
    private account: AccountService,
    private dialog: MatDialog,
    public sidenav: SideNavService
  ) {
    this.currentUser = this.account.currentUser();
  }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }

  toggleLoadingBar() {
    this.showLoadingBarEvent.emit();
  }

  openAccountCard() {
    this.dialog.open(AccountDialogComponent, {
      hasBackdrop: false,
      width: '350px',
      position: {top: '48px', right: '0'},
      role: 'alertdialog',
      data: this.currentUser,
      panelClass: ['account-card']
    });
  }
}
