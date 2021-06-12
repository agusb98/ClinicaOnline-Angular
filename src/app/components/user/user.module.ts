import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from 'src/app/pages/user/user-login/user-login.component';
import { UserProfileComponent } from 'src/app/pages/user/user-profile/user-profile.component';
import { UserLogoutComponent } from 'src/app/pages/user/user-logout/user-logout.component';
import { UserRegisterComponent } from 'src/app/pages/user/user-register/user-register.component';
import { AdminAddComponent } from 'src/app/pages/admin/admin-add/admin-add.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserLogoutComponent, 
    UserProfileComponent, 
    UserRegisterComponent, 
    AdminAddComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
