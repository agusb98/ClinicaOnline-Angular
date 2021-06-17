import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [AuthService]
})
export class UserLoginComponent {

  usuarioSeleccionado: any;

  listadoUsuarios = [];

  inicioRapido: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  btnIndex() {
    if (this.inicioRapido) { this.inicioRapido = false; }
    else { this.inicioRapido = true; }
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
    { this.router.navigate(['home']); }
  }

  quickLog($usuario) {
    this.usuarioSeleccionado = $usuario;
  }
}
