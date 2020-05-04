import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shell',
  template: `
    <div style="height: 100%" fxLayout="column">
      <app-nav (toggleSideNavEvent)="onToggleSideNav($event)"></app-nav>
      <mat-sidenav-container fxFlex="grow">
        <mat-sidenav mode="side" [class.mat-elevation-z4]="true" style="width: 240px" [opened]="openSideNav">
          <mat-nav-list dense>
            <mat-list-item routerLink="/welcome">
              <mat-icon>dashboard</mat-icon>
              Dashboard
            </mat-list-item>
            <mat-list-item routerLink="">
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
            <mat-expansion-panel [class.mat-elevation-z0]="true" dense>
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
            <mat-expansion-panel [class.mat-elevation-z0]="true" dense>
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
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    mat-icon {
      font-size: 28px;
      margin-right: 10px;
    }

    .mat-expansion-panel-header {
      padding: 0 20px;
    }
  `]
})
export class ShellComponent implements OnInit {

  openSideNav = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleSideNav(open: boolean) {
    this.openSideNav = open;
  }
}