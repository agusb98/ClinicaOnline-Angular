import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialistaListComponent } from 'src/app/pages/admin/especialista-list/especialista-list.component';
import { UserListComponent } from 'src/app/pages/admin/user-list/user-list.component';
import { AdminAddComponent } from 'src/app/pages/admin/admin-add/admin-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/esp', component: EspecialistaListComponent },
   { path: 'add', component: AdminAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
