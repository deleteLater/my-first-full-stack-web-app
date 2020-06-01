import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/material/app-material.module';
import {ShellComponent} from './components/shell.component';
import {NavComponent} from './components/nav/nav.component';
import {AuthenticateComponent} from './components/authenticate/authenticate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PageNotFoundComponent} from './components/error/page-not-found.component';
import {InternalServerErrorComponent} from './components/error/internal-server-error.component';
import {ChartsModule} from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import {ForTestComponent} from './components/for-test/for-test.component';
import {PageInBuildingComponent} from './components/error/page-in-building.component';
import {PricingComponent} from './components/pricing/pricing.component';
import {TenantRegistrationDialogComponent} from './components/pricing/tenant-registration-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    NavComponent,
    AuthenticateComponent,
    PageNotFoundComponent,
    ForTestComponent,
    InternalServerErrorComponent,
    PageInBuildingComponent,
    PricingComponent,
    TenantRegistrationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
