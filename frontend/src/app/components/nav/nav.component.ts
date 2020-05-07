import {Component, EventEmitter, OnInit, Output} from '@angular/core';

// noinspection CssUnusedSymbol
@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar class="mat-elevation-z4">
      <div class="icon-container" matRipple (click)="toggleSideNav()">
        <mat-icon>{{openSideNav ? 'menu_open' : 'menu'}}</mat-icon>
      </div>
      <a routerLink="" style="text-decoration: none; color: #222b45; font-size: 36px"><h1>Welcome</h1></a>

      <div class="spacer"></div>

      <a mat-button routerLink="/page-not-found">NOT FOUND</a>
      <a mat-button routerLink="/error">ERROR</a>
      <a mat-button (click)="toggleLoadingBar()">SLOW LOAD</a>
      <a mat-button href="https://github.com/deleteLater/my-first-full-stack-web-app" target="_blank">
        <div class="icon-btn">
          <mat-icon svgIcon="github"></mat-icon>
          <span>GITHUB</span>
        </div>
      </a>
      <a mat-raised-button class="login-btn" routerLink="/authenticate">
        <div class="icon-btn">
          <mat-icon svgIcon="signin"></mat-icon>
          <span>SIGN IN</span>
        </div>
      </a>
    </mat-toolbar>
  `,
  styles: [`

    mat-toolbar {
      background-color: #fff;
      color: #222b45;
      position: relative;
      z-index: 9999;
    }

    .login-btn {
      background-color: #1389FD;
      color: #fff;
      padding: 0 10px;
    }

    .icon-btn {
      display: flex;
      align-items: center;
    }

    .icon-btn span {
      margin-left: 6px;
    }

    .spacer {
      flex: 1 1 auto;
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

  openSideNav = true;
  @Output() showLoadingBarEvent = new EventEmitter();
  @Output() toggleSideNavEvent = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.openSideNav = !this.openSideNav;
    this.toggleSideNavEvent.emit(this.openSideNav);
  }

  toggleLoadingBar() {
    this.showLoadingBarEvent.emit();
  }
}
