import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { EspecialistaListComponent } from './especialista-list/especialista-list.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { UserRegisterComponent } from '../user/user-register/user-register.component';


@NgModule({
  declarations: [UserListComponent, EspecialistaListComponent, AdminAddComponent, UserRegisterComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserRegisterComponent
  ]
})
export class AdminModule { }
