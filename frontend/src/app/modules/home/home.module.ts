import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppMaterialModule} from '../material/app-material.module';
import {TodoComponent} from './todo/todo.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TodoItemComponent} from './todo/todo-item.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, TodoComponent, TodoItemComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class HomeModule {
}
