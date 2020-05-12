import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GeneralRoutingModule} from './general-routing.module';
import {GeneralComponent} from './general.component';
import {AppMaterialModule} from '../material/app-material.module';
import {UserComponent} from './user/user.component';
import {RoleComponent} from './role/role.component';
import {PermissionComponent} from './permission/permission.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SaveUserDialogComponent} from './user/save-user-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {DeleteUserDialogComponent} from './user/delete-user-dialog.component';
import {StringTruncatePipe} from '../../shared/pipes/string-truncate.pipe';
import {UserSnackBarComponent} from './user/user-snack-bar.component';

@NgModule({
  declarations: [
    GeneralComponent,
    UserComponent,
    RoleComponent,
    PermissionComponent,
    SaveUserDialogComponent,
    DeleteUserDialogComponent,
    StringTruncatePipe,
    UserSnackBarComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TextMaskModule,
  ]
})
export class GeneralModule {
}
