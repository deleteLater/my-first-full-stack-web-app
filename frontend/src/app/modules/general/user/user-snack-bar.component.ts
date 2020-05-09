import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-snack-bar',
  template: `
    <span style="color: black">{{msg}}</span>
  `,
  styles: [``]
})
export class UserSnackBarComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public msg: string
  ) {
    console.log(msg);
  }

  ngOnInit(): void {
  }

}
