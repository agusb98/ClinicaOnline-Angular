import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: boolean = false;
  public email: string = '';

  constructor(
    public afAuth: AngularFireAuth,
    private toastrService: ToastrService
  ) { }

  async login(email: string, password: string) {
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.isLogged = true; //flag about user signin
      this.email = email;
      this.toastrService.success('Ingreso con Exito', 'Iniciar Sesión');
      return user;
    }
    catch (error) { this.toastrService.error('Email/Contraseña Incorrecto', 'Iniciar Sesión'); }
    return;
  }

  async register(email: string, password: string) {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.isLogged = true; //flag about user signin
      this.email = email;
      this.toastrService.success('Bienvenido!', 'Registro de Usuario');
      return user;
    }
    catch (error) { this.toastrService.error(error.message, 'Registro de Usuario'); }
    return;
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.isLogged = false; //flag about user logout
      this.email = '';
      this.toastrService.success('Sesion Cerrada con Exito', 'Salir');
    }
    catch (error) { this.toastrService.error(error.message, 'Cerrar Sesión'); }
    return;
  }
}
