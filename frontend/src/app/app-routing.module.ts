import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShellComponent} from './components/shell.component';
import {AuthenticateComponent} from './components/authenticate/authenticate.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {PageNotFoundComponent} from './components/error/page-not-found.component';
import {InternalServerErrorComponent} from './components/error/internal-server-error.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'dashboard', component: DashboardComponent}
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
