import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z6">
    <span><mat-icon>deck</mat-icon>Welcome</span>

    <div class="spacer"></div>

    <a mat-button routerLink="/home">Home</a>
    <a mat-button routerLink="/about">About</a>
    <a mat-raised-button color="warn" routerLink="/authenticate">Sign In</a>
  </mat-toolbar>
  `,
  styles: ['.spacer {flex: 1 1 auto; } mat-icon {margin-right: 10px}']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
