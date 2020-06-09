import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
      <div class="content">
        <h1 id="h1-404">Page Not Found</h1>
        <img src="../../../../assets/img/404.gif" alt="not-found image">
        <a id="a-404" mat-stroked-button routerLink="">BACK TO HOME</a>
      </div>
    </div>
  `,
  styleUrls: ['error-page.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
