import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
      <div class="content">
        <h1>Page Not Found</h1>
        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="not-found image">
        <a mat-stroked-button routerLink="">BACK TO HOME</a>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    .content {
      position: relative;
      display: inline-block;
    }

    h1, a {
      position: absolute;
      z-index: 999;
      margin: 0 auto;
      left: 0;
      right: 0;
    }

    h1 {
      top: 10%;
      width: 45%;
      font-size: 48px;
      font-family: 'Jost', serif;
    }

    a {
      bottom: 10%;
      width: 25%;
    }
  `]
})
export class PageNotFoundComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
