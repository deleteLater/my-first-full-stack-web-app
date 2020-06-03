import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShellComponent} from './components/shell.component';
import {AuthenticateComponent} from './components/authenticate/authenticate.component';
import {PageNotFoundComponent} from './components/error/page-not-found.component';
import {InternalServerErrorComponent} from './components/error/internal-server-error.component';
import {ForTestComponent} from './components/for-test/for-test.component';
import {PageInBuildingComponent} from './components/error/page-in-building.component';
import {PricingComponent} from './components/pricing/pricing.component';
import {AuthGuard} from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '', component: ShellComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
      {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
    ]
  },
  {path: 'authenticate', component: AuthenticateComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'error', component: InternalServerErrorComponent},
  {path: 'page-in-building', component: PageInBuildingComponent},
  {path: 'test-page', component: ForTestComponent},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
