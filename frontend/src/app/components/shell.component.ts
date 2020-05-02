import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
