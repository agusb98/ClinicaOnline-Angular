import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegisterComponent } from './user-register/user-register.component';

//   Send unauthorized users to login
 const redirectUnauthorizedToLogin = () =>
   redirectUnauthorizedTo(['user/login']);

  // Automatically log in users
 const redirectLoggedInToProfile = () =>
   redirectLoggedInTo(['user/profile']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent , ...canActivate(redirectLoggedInToProfile) },
  { path: 'register', component: UserRegisterComponent , ...canActivate(redirectLoggedInToProfile) },
  { path: 'logout', component: UserLogoutComponent , ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'profile', component: UserProfileComponent , ...canActivate(redirectUnauthorizedToLogin) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
