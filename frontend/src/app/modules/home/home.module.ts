import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppMaterialModule} from '../material/app-material.module';
import {TodoComponent} from './todo/todo.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TodoItemReadComponent} from './todo/todo-item-read.component';
import {TodoItemUpdateComponent} from './todo/todo-item-update.component';
import {TodoItemContainerComponent} from './todo/todo-item-container.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    TodoComponent,
    TodoItemReadComponent,
    TodoItemUpdateComponent,
    TodoItemContainerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class HomeModule {
}
