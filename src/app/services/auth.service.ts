import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LogService } from './log.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private toastrService: ToastrService,
    private userService: UserService,
    private logService: LogService,
    private router: Router
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

  async login(email: string, password: string) {

    try {
      let user$: Observable<any> = this.userService.getOne(email);

      user$.subscribe(async data => {
        if (data[0] && data[0].user === 'ESPECIALISTA' && !data[0]['status']) {
          this.toastrService.error('Usuario no Verificado por Administrador!', 'Iniciar Sesión');
          return;
        }
      })
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);

      if ((user.user.emailVerified) || (this.quickLog(email, password))) {
        user$.subscribe(data => { this.logService.add(data[0]); });

        this.toastrService.success('Ingreso con Exito!', 'Iniciar Sesión');
        this.router.navigate(['home']);
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
    }
    catch (error) { this.toastrService.error(error.message, 'Cerrar Sesión'); }
  }

  getCurrentUser() {
    return this.afAuth.currentUser;
  }


  // Sortcuts of users: email and password

  quickLog(email: string, password: string): boolean {

    //Adminitradores
    if ('rociocabb98@gmail.com' == email && 'acer1234' == password) {
      return true;
    }
    if ('bauti98k@gmail.com' == email && 'acer1234' == password) {
      return true;
    }

    //Pacientes
    if ('paciente@paciente.com' == email && 'acer1234' == password) {
      return true;
    }
    if ('agusszurdob@gmail.com' == email && 'acer1234' == password) {
      return true;
    }
    if ('staff98k@gmail.com' == email && 'acer1234' == password) {
      return true;
    }

     // Especialista
     if ('jose98k@gmail.com' == email && 'acer1234' == password) {
      return true;
    }
    if ('especialista@especialista.com' == email && 'acer1234' == password) {
      return true;
    }
    if ('cami98k@gmail.com' == email && 'acer1234' == password) {
      return true;
    }
    
    return false;
  }

}
