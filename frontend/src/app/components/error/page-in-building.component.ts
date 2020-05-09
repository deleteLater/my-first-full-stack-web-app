import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-in-building',
  template: `
    <div class="container">
      <div class="content">
        <h1 id="h1-page-in-building">Page In Building</h1>
        <img src="../../../assets/img/exhausted-with-work.jpg" alt="page in building">
        <a id="a-page-not-found" mat-stroked-button routerLink="">BACK TO HOME</a>
      </div>
    </div>
  `,
  styleUrls: ['error-page.scss']
})
export class PageInBuildingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
