import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';

//   Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
redirectUnauthorizedTo(['user/login']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'user', loadChildren: () => import('./components/user/user-routing.module').then(m => m.UserRoutingModule) },
  { path: 'admin', loadChildren: () => import('./components/admin/admin-routing.module').then(m => m.AdminRoutingModule) },
  { path: 'turno', loadChildren: () => import('./components/turno/turno-routing.module').then(m => m.TurnoRoutingModule) },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
