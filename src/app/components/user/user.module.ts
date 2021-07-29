import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from 'src/app/pages/user/user-login/user-login.component';
import { UserProfileComponent } from 'src/app/pages/user/user-profile/user-profile.component';
import { UserLogoutComponent } from 'src/app/pages/user/user-logout/user-logout.component';
import { UserRegisterComponent } from 'src/app/pages/user/user-register/user-register.component';
import { AdminAddComponent } from 'src/app/pages/admin/admin-add/admin-add.component';
import { BrowserModule } from '@angular/platform-browser';
import { EspecialidadListComponent } from 'src/app/pages/especialidad/especialidad-list/especialidad-list.component';

//Traductor
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CaptchaComponent } from '../captcha/captcha.component';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserLogoutComponent,
    UserProfileComponent,
    UserRegisterComponent,
    EspecialidadListComponent,
    AdminAddComponent,
    CaptchaComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    BrowserModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule
  ]
})
export class UserModule { }
