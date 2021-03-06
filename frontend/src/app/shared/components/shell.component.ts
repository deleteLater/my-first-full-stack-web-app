import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {SideNavService} from './nav/shared/side-nav.service';
import {MatDialog} from '@angular/material/dialog';

// noinspection CssUnusedSymbol
@Component({
  selector: 'app-shell',
  template: `
    <div style="height: 100%" fxLayout="column">
      <app-nav (showLoadingBarEvent)="onShowLoadingBar()"></app-nav>
      <mat-progress-bar mode="indeterminate" value="40" *ngIf="loading"></mat-progress-bar>
      <mat-sidenav-container fxFlex="grow">
        <mat-sidenav mode="side" class="mat-elevation-z4" style="width: 240px;" [opened]="sidenav.opened()">
          <mat-nav-list dense>
            <mat-list-item routerLink="/home">
              <mat-icon>home</mat-icon>
              HOME
            </mat-list-item>
            <mat-list-item routerLink="/page-in-building">
              <mat-icon>notifications</mat-icon>
              Notification
            </mat-list-item>
            <mat-expansion-panel class="mat-elevation-z0" dense>
              <mat-expansion-panel-header>
                General
              </mat-expansion-panel-header>
              <mat-nav-list dense>
                <a mat-list-item routerLink="/general/user">
                  <mat-icon>group</mat-icon>
                  Users
                </a>
                <a mat-list-item routerLink="/general/role">
                  <mat-icon svgIcon="role"></mat-icon>
                  Roles
                </a>
              </mat-nav-list>
            </mat-expansion-panel>
            <mat-expansion-panel class="mat-elevation-z0" dense>
              <mat-expansion-panel-header>
                Preference
              </mat-expansion-panel-header>
              <mat-nav-list dense>
                <a mat-list-item routerLink="/page-in-building">
                  <mat-icon>attach_money</mat-icon>
                  Billing</a>
                <a mat-list-item routerLink="/page-in-building">
                  <mat-icon>settings_applications</mat-icon>
                  Statics</a>
              </mat-nav-list>
            </mat-expansion-panel>
            <mat-expansion-panel class="mat-elevation-z0" dense>
              <mat-expansion-panel-header>
                Privacy
              </mat-expansion-panel-header>
              <mat-nav-list dense>
                <a mat-list-item routerLink="/page-in-building">
                  <mat-icon>person_add</mat-icon>
                  Partnership Request</a>
                <a mat-list-item routerLink="/page-in-building">
                  <mat-icon>visibility</mat-icon>
                  Profile Visibility</a>
              </mat-nav-list>
            </mat-expansion-panel>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <div [ngClass]="sidenav.opened() ? 'sub-main' : ''">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    mat-icon {
      font-size: 30px;
      margin-right: 10px;
    }

    .mat-nav-list .mat-list-item {
      margin-bottom: 8px;
      font-size: 14px;
    }

    mat-card {
      margin: 10px;
    }

    .sub-main {
      margin: 10px;
    }
  `]
})
export class ShellComponent implements OnInit {

  loading = true;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public sidenav: SideNavService
  ) {
    this.router.events.subscribe(routeEvent => {
      this.dialog.closeAll();

      switch (true) {
        case routeEvent instanceof NavigationStart:
          this.loading = true;
          break;

        case routeEvent instanceof NavigationEnd:
        case routeEvent instanceof NavigationCancel:
        case routeEvent instanceof NavigationError:
          this.loading = false;
          break;
      }
    });
  }

  ngOnInit(): void {
  }

  onShowLoadingBar() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
