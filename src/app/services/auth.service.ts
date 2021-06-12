import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public email: string = '';

  constructor(
    public afAuth: AngularFireAuth,
    private toastrService: ToastrService,
    private userService: UserService,
  ) { }

  /* 
  Flag checking if user is or not logged 
*/
  public userLoggedIn(): boolean {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) { return true }
    })
    return false;
  }

  /* 
  Sortcuts of users: email and password
 */
  quickLog(email, password): boolean {
    if ('admin@admin.com' == email && '111111' && password) {
      return true;
    }
    if ('especialista@especialista.com' == email && '222222' && password) {
      return true;
    }
    if ('paciente@paciente.com' == email && '333333' && password) {
      return true;
    }
    if ('carlitos@gmail.com' == email && 'acer1234' && password) {
      return true;
    }
    return false;
  }

  async login(email: string, password: string) {
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);

      if ((user.user.emailVerified) || (this.quickLog(email, password))) {
        this.toastrService.success('Ingreso con Exito!', 'Iniciar Sesión');
        this.email = email;
        return user
      }
      else {
        this.afAuth.signOut();
        this.toastrService.error('Usuario no Verificado!', 'Iniciar Sesión');
      }
    }
    catch (error) { this.toastrService.error('Email/Contraseña Incorrecto', 'Iniciar Sesión'); }
    return;
  }

  async register(email: string, password: string): Promise<any> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      await this.afAuth.signOut();
      this.toastrService.success('Ultimo paso! verifique su email en su casilla de correo', 'Registro de Usuario');
    }
    catch (error) { this.toastrService.error(error.message, 'Registro de Usuario'); }
    return;
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      const current = await this.afAuth.currentUser;
      return current.sendEmailVerification();
    }
    catch (error) { }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.toastrService.success('Sesion Cerrada con Exito', 'Salir');
      this.email = '';
    }
    catch (error) { this.toastrService.error(error.message, 'Cerrar Sesión'); }
  }

  getCurrentUser() {
    return this.afAuth.currentUser;
  }
}
