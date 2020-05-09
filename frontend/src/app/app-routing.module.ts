import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShellComponent} from './components/shell.component';
import {AuthenticateComponent} from './components/authenticate/authenticate.component';
import {PageNotFoundComponent} from './components/error/page-not-found.component';
import {InternalServerErrorComponent} from './components/error/internal-server-error.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
      {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
    ]
  },
  {path: 'authenticate', component: AuthenticateComponent},
  {path: 'error', component: InternalServerErrorComponent},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
