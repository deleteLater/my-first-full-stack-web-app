import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z8">

      <button mat-icon-button (click)="toggleSideNav()" disableRipple>
        <mat-icon>menu</mat-icon>
        Welcome
      </button>

      <div class="spacer"></div>

      <a mat-button routerLink="/home">Home</a>
      <a mat-button routerLink="/about">About</a>
      <a mat-raised-button color="warn" routerLink="/authenticate">Sign In</a>
    </mat-toolbar>
  `,
  styles: ['.spacer {flex: 1 1 auto; } mat-icon {margin-right: 10px}']
})
export class NavComponent implements OnInit {

  @Output() toggleNavEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.toggleNavEvent.emit();
  }
}
