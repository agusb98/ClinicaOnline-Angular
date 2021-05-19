import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUser();
  }

  /* 
    check if user id logged by localstore
   */
  checkUser(): boolean {
    if (this.authService.isLogged) {
      return true;
    }
    this.router.navigate(['user/login']);   //Redirect to login
    return false;
  }

}
