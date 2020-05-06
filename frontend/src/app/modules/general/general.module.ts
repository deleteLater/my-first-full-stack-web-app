import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GeneralRoutingModule} from './general-routing.module';
import {GeneralComponent} from './general.component';
import {AppMaterialModule} from '../material/app-material.module';
import {UserComponent} from './user/user.component';
import {RoleComponent} from './role/role.component';
import {PermissionComponent} from './permission/permission.component';

@NgModule({
  declarations: [GeneralComponent, UserComponent, RoleComponent, PermissionComponent],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    AppMaterialModule
  ]
})
export class GeneralModule {
}
