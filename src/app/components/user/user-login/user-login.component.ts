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

  admin() {
    this.loginForm.controls['email'].setValue("admin@admin.com");
    this.loginForm.controls['clave'].setValue("111111");
  }

  paciente() {
    this.loginForm.controls['email'].setValue("paciente@paciente.com");
    this.loginForm.controls['clave'].setValue("222222");
  }

  especialista() {
    this.loginForm.controls['email'].setValue("especialista@especialista.com");
    this.loginForm.controls['clave'].setValue("333333");
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    await this.authService.login(email, password).then((res: any) =>{
      
    });
    { this.router.navigate(['home']); }
  }

  isAdmin(user) {
    let userAdmin = this.listadoUsuarios.filter(u => u.id == user.uid);
    console.log(userAdmin[0].perfil)

    if (userAdmin[0].perfil == "admin") {
      

      this.router.navigate(["/seccionUsuarios"]);

    }
  }

  quickLog($usuario) {
    this.usuarioSeleccionado = $usuario;
  }
  /* 
    async onLogin() {
      const { email, password } = this.loginForm.value;
      try {
        const user = await this.authService.login(email, password);
        if (user) { 
          this.router.navigate(['/home']);   //Redirect to homepage
        }
      }
      catch (error) { }
    }
  
    quickLog(){
      this.loginForm.value.password = '12345678';
      this.loginForm.value.email= "el.octavio.villegas@gmail.com";
    } */
}
