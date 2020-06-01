import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {HelperService} from '../../services/helper.service';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-add-tenant-dialog',
  template: `
    <h1 mat-dialog-title>Agency Register</h1>
    <div mat-dialog-content>
      <mat-vertical-stepper [linear]="true" #stepper>
        <mat-step [stepControl]="agencyForm" editable="false">
          <form [formGroup]="agencyForm" (ngSubmit)="createAdminForAgency()">
            <ng-template matStepLabel>Agency Name</ng-template>
            <mat-form-field>
              <mat-label>Name</mat-label>
              <input matInput placeholder="Please provide your Agency Name" formControlName="name" required>
            </mat-form-field>
            <div>
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>

        <mat-step [editable]="false">
          <ng-template matStepLabel>Account Info</ng-template>
          <ng-container *ngIf="admin">
            <h2>Your admin info, ok with that?</h2>
            <div fxLayout="row">
              <div class="avatar-container" fxFlex="20">
                <mat-icon svgIcon="superman"></mat-icon>
              </div>
              <div>
                <p><strong>admin:</strong> {{this.admin.name}}</p>
                <p><strong>password:</strong> {{this.admin.password}}</p>
              </div>
            </div>
            <div fxLayout="row">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button style="margin-right: 5px" (click)="createNewTenant()">Register</button>
              <mat-spinner diameter="25" strokeWidth="3" *ngIf="showRegistrationSpinner"></mat-spinner>
            </div>
          </ng-container>
        </mat-step>

        <mat-step [editable]="false">
          <ng-template matStepLabel>Pay Now</ng-template>
          <img src="../../../assets/img/example-qr-code.png" alt="example-qr-code.png">
          <div style="text-align: end">
            <button mat-button color="warn" matStepperNext>PAY LATER</button>
          </div>
        </mat-step>

        <mat-step [editable]="false">
          <ng-template matStepLabel>Done</ng-template>
          <div style="margin-top: 5px">
            <p style="font-size: 14px; font-weight: bold; display: inline-block">You are now done.&nbsp;&nbsp;</p>
            <a routerLink="/authenticate" (click)="close()"><strong>Login Now?</strong></a>
          </div>
        </mat-step>
      </mat-vertical-stepper>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">OK</button>
    </div>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }

    .avatar-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
    }

    .avatar-container .mat-icon {
      height: 38px;
      width: 38px;
    }
  `]
})
export class TenantRegistrationDialogComponent implements OnInit {

  @ViewChild('stepper')
  stepper: MatStepper;

  agencyForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(15)]]
  });

  admin: { name: string, password: string } = {
    name: 'init',
    password: 'init'
  };

  showRegistrationSpinner = false;

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private dialogRef: MatDialogRef<TenantRegistrationDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close('');
  }

  createAdminForAgency() {
    this.admin = {
      name: this.agencyForm.controls.name.value,
      password: this.helper.generatePassword()
    };
  }

  createNewTenant() {
    this.showRegistrationSpinner = true;
    setTimeout(() => {
      this.showRegistrationSpinner = false;
      this.stepper.next();
    }, 1500);
  }
}
