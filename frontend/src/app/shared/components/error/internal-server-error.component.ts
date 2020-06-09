import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-internal-server-error',
  template: `
    <div class="container">
      <div class="content">
        <h1 id="h1-500">Internal Server Error</h1>
        <p id="p-500">we are sorry for that and try to fix this soon.</p>
        <img src="../../../../assets/img/500.png" alt="not-found image">
        <a id="a-500" mat-stroked-button (click)="back()">TAKE ME BACK</a>
      </div>
    </div>
  `,
  styleUrls: ['error-page.scss']
})
export class InternalServerErrorComponent implements OnInit {

  constructor(
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }
}
