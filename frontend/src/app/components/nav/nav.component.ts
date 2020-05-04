import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar class="mat-elevation-z4">
      <div class="icon-container" matRipple (click)="toggleSideNav()">
        <mat-icon>{{openSideNav ? 'menu_open' : 'menu'}}</mat-icon>
      </div>
      <a routerLink="" style="text-decoration: none; color: #222b45; font-size: 36px"><h1>Welcome</h1></a>

      <div class="spacer"></div>

      <a mat-button routerLink="/home">Home</a>
      <a mat-button routerLink="/about">About</a>
      <a mat-raised-button color="warn" routerLink="/authenticate">Sign In</a>
    </mat-toolbar>
  `,
  styles: [`

    mat-toolbar {
      background-color: #fff;
      color: #222b45;
      position: relative;
      z-index: 9999;
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
  @Output() toggleSideNavEvent = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.openSideNav = !this.openSideNav;
    this.toggleSideNavEvent.emit(this.openSideNav);
  }
}
