import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TenantRegistrationDialogComponent} from './tenant-registration-dialog.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  afterBuy() {
    const dialogRef = this.dialog.open(TenantRegistrationDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(
      value => console.log(value)
    );
  }
}
