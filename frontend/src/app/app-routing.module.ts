import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShellComponent} from './components/shell.component';
import {AuthenticateComponent} from './components/authenticate/authenticate.component';
import {WelcomeComponent} from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      {path: 'welcome', component: WelcomeComponent}
    ]
  },
  {path: 'authenticate', component: AuthenticateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
