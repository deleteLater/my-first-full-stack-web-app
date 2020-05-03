import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {ShellComponent} from './components/shell.component';
import {NavComponent} from './components/nav/nav.component';
import {AuthenticateComponent} from './components/authenticate/authenticate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    NavComponent,
    AuthenticateComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
