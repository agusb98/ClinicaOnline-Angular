import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from '../user/user-register/user-register.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { EspecialistaListComponent } from './especialista-list/especialista-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'list', component: UserListComponent },
  { path: 'especialista/list', component: EspecialistaListComponent },
  { path: 'add', component: AdminAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), UserRegisterComponent],
  exports: [RouterModule, UserRegisterComponent],
})
export class AdminRoutingModule { }
