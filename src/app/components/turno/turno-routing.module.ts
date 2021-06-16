import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { TurnoAddComponent } from 'src/app/pages/turno/turno-add/turno-add.component';
import { TurnoListComponent } from 'src/app/pages/turno/turno-list/turno-list.component';

//   Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['user/login']);

// Automatically log in users
const redirectLoggedInToProfile = () =>
  redirectLoggedInTo(['user/profile']);

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TurnoListComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'turno/add', component: TurnoAddComponent, ...canActivate(redirectUnauthorizedToLogin) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoRoutingModule { }
