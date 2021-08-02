import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [AuthService]
})
export class UserLoginComponent implements OnInit {

  inicioRapido: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  langs: string[] = [];

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getLangs();
  }

  btnIndex() {
    if (this.inicioRapido) { this.inicioRapido = false; }
    else { this.inicioRapido = true; }
  }

  set email(str: string) {
    this.loginForm.controls['email'].setValue(str);
  }

  set password(str: string) {
    this.loginForm.controls['password'].setValue(str);
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
  }

  quickLog(str: string) {
    this.password = 'acer1234';
    switch (str) {
      case 'Paciente':
        this.email = 'paciente@paciente.com';
        break;
      case 'Especialista':
        this.email = 'especialista@especialista.com';
        break;
      case 'Administrador':
        this.email = 'bauti98k@gmail.com';
        break;
    }
  }

  getLangs() {
    this.translate.addLangs(['en', 'es', 'po']);
    this.langs = this.translate.getLangs();
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
