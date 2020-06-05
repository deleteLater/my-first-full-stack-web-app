import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppMaterialModule} from '../material/app-material.module';
import {TodoComponent} from './todo/todo.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, TodoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule
  ]
})
export class HomeModule {
}
