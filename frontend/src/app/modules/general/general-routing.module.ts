import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GeneralComponent} from './general.component';
import {UserComponent} from './user/user.component';
import {RoleComponent} from './role/role.component';

const routes: Routes = [{
  path: '', component: GeneralComponent, children: [
    {path: 'user', component: UserComponent},
    {path: 'role', component: RoleComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule {
}
