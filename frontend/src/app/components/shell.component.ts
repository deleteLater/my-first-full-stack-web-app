import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

// noinspection CssUnusedSymbol
@Component({
  selector: 'app-shell',
  template: `
    <div style="height: 100%" fxLayout="column">
      <app-nav (toggleSideNavEvent)="onToggleSideNav($event)" (showLoadingBarEvent)="onShowLoadingBar()"></app-nav>
      <mat-progress-bar mode="indeterminate" value="40" *ngIf="loading"></mat-progress-bar>
      <mat-sidenav-container fxFlex="grow">
        <mat-sidenav mode="side" class="mat-elevation-z4" style="width: 240px;" [opened]="openSideNav">
          <mat-nav-list dense>
            <mat-list-item routerLink="/dashboard">
              <mat-icon>dashboard</mat-icon>
              Dashboard
            </mat-list-item>
            <mat-list-item routerLink="/general">
              <mat-icon>check_box</mat-icon>
              General
            </mat-list-item>
            <mat-list-item routerLink="">
              <mat-icon>person</mat-icon>
              Profile
            </mat-list-item>
            <mat-list-item routerLink="">
              <mat-icon>notification_important</mat-icon>
              Notification
            </mat-list-item>
            <mat-expansion-panel class="mat-elevation-z0" dense>
              <mat-expansion-panel-header>
                Preference
              </mat-expansion-panel-header>
              <mat-nav-list dense>
                <a mat-list-item routerLink="">
                  <mat-icon>attach_money</mat-icon>
                  Billing</a>
                <a mat-list-item routerLink="">
                  <mat-icon>notification_important</mat-icon>
                  Notification</a>
              </mat-nav-list>
            </mat-expansion-panel>
            <mat-expansion-panel class="mat-elevation-z0" dense>
              <mat-expansion-panel-header>
                Privacy
              </mat-expansion-panel-header>
              <mat-nav-list dense>
                <a mat-list-item routerLink="">
                  <mat-icon>person_add</mat-icon>
                  Partnership Request</a>
                <a mat-list-item routerLink="">
                  <mat-icon>visibility</mat-icon>
                  Profile Visibility</a>
              </mat-nav-list>
            </mat-expansion-panel>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <div [ngClass]="openSideNav ? 'sub-main' : ''">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    mat-icon {
      font-size: 28px;
      margin-right: 10px;
    }

    .mat-nav-list .mat-list-item {
      margin-bottom: 8px;
      font-size: 14px;
    }

    .mat-expansion-panel-header {
      padding: 0 20px;
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

  openSideNav = true;
  loading = true;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(routeEvent => {
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

  onToggleSideNav(open: boolean) {
    this.openSideNav = open;
  }

  onShowLoadingBar() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
