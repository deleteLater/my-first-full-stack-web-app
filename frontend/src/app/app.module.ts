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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ForTestComponent} from './components/for-test/for-test.component';
import {PageInBuildingComponent} from './components/error/page-in-building.component';
import {PricingComponent} from './components/pricing/pricing.component';
import {TenantRegistrationDialogComponent} from './components/pricing/tenant-registration-dialog.component';
import {InternalFakeBackendInterceptor} from './_helpers/internal-fake-backend.interceptor';
import {AuthInterceptor} from './_helpers/auth.interceptor';
import {AccountDialogComponent} from './components/nav/account-dialog.component';
import {StoreModule} from '@ngrx/store';
import {exampleReducer} from './components/for-test/example.reducer';

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
    AccountDialogComponent,
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
    HttpClientModule,
    StoreModule.forRoot({ status: exampleReducer })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InternalFakeBackendInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
