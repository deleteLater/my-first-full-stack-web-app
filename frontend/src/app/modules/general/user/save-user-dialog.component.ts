import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {SaveUserInfo} from './user.component';

@Component({
  template: `
    <h1 mat-dialog-title>{{data.action}}</h1>
    <div mat-dialog-content>
      <form [formGroup]="userForm">
        <!-- UserName -->
        <mat-form-field appearance="outline">
          <mat-label>UserName</mat-label>
          <input #userName matInput formControlName="name" maxlength="15" required>
          <mat-icon svgIcon="user" matPrefix></mat-icon>
          <mat-error *ngIf="userForm.controls.name.hasError('required')">
            username is required
          </mat-error>
          <mat-hint align="end">{{userName.value.length}} / 15</mat-hint>
        </mat-form-field>

        <!-- Sex -->
        <mat-form-field appearance="outline">
          <mat-label>Sex</mat-label>
          <mat-icon svgIcon="gender" matPrefix></mat-icon>
          <mat-error *ngIf="userForm.controls.name.hasError('required')">
            sex is required
          </mat-error>
          <mat-select formControlName="sex" required>
            <mat-option value="boy">BOY</mat-option>
            <mat-option value="girl">GIRL</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Role -->
        <mat-form-field appearance="outline">
          <mat-label>Role</mat-label>
          <mat-icon matPrefix>security</mat-icon>
          <mat-select formControlName="role">
            <mat-option *ngFor="let role of roles" [value]="role">{{role}}</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Phone -->
        <mat-form-field appearance="outline">
          <mat-label>Phone</mat-label>
          <mat-icon matPrefix>phone</mat-icon>
          <input matInput type="text" formControlName="phone" required id="phone" placeholder="+86 "
                 [textMask]="{mask: phoneMask}">
          <mat-error *ngIf="userForm.controls.phone.hasError('required')">
            phone is required
          </mat-error>
        </mat-form-field>

        <!-- Email -->
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <mat-icon matPrefix>email</mat-icon>
          <input matInput formControlName="email" required email>
          <mat-error *ngIf="userForm.controls.email.hasError('required')">
            email is required
          </mat-error>
          <mat-error *ngIf="userForm.controls.email.hasError('email')">
            wrong email provided
          </mat-error>
        </mat-form-field>

        <!-- Description -->
        <mat-form-field appearance="outline" floatLabel="always">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Ex: wow, it's so awesome"></textarea>
        </mat-form-field>

      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="cancel()">CANCEL</button>
      <button mat-button (click)="save()" [disabled]="userForm.invalid">{{data.action}}</button>
    </div>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }

    mat-icon {
      margin-right: 5px;
    }
  `]
})
export class SaveUserDialogComponent implements OnInit {

  phoneMask = ['+', '8', '6', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  roles = ['admin', 'common', 'test'];

  userForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.max(15)]],
      sex: ['', [Validators.required]],
      role: [''],
      avatar: ['default'],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
    }
  );

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SaveUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SaveUserInfo
  ) {
    if (data.user) {
      // update operation
      const userToUpdate = data.user;
      this.userForm.patchValue({
        id: userToUpdate.id,
        name: userToUpdate.name,
        sex: userToUpdate.sex,
        role: userToUpdate.role,
        avatar: userToUpdate.avatar,
        phone: userToUpdate.phone,
        email: userToUpdate.email,
        description: userToUpdate.description
      });
    }

    // else create operation
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.userForm.value);
  }
}
