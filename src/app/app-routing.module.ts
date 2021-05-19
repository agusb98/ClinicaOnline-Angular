import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';

//   Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
redirectUnauthorizedTo(['user/login']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'user', loadChildren: () => import('./components/user/user-routing.module').then(m => m.UserRoutingModule) },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
