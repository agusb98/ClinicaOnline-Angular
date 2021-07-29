import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { Especialidad } from 'src/app/models/especialidad';
import { Especialista } from 'src/app/models/especialista';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  photo: any = null;
  photo2: any = null;

  @Input() captcha = false;
  @Input() isAdmin = false;
  flagEspecialidad: boolean = false;

  public kyndUser = 'Paciente';
  public formAdmin: FormGroup;
  public formPaciente: FormGroup;
  public formEspecialista: FormGroup;

  especialidadSelected: any[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  setUser(user: string) {
    this.kyndUser = user;
  }

  ngOnInit(): void {
    this.selectButtons();
    this.formAdmin = this.createValidatorsAdmin(this.formBuilder);
    this.formPaciente = this.createValidatorsPaciente(this.formBuilder);
    this.formEspecialista = this.createValidatorsEspecialista(this.formBuilder);

    if (this.isAdmin) { this.kyndUser = 'Administrador'; }
  }

  selectButtons() {
    if (this.isAdmin) {
      document.getElementById('btn-user-paciente').style.display = 'none';
      document.getElementById('btn-user-especialista').style.display = 'none';
    }
  }

  createValidatorsAdmin(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      dni: new FormControl('', [Validators.required, Validators.min(11111111), Validators.max(99999999)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(15)]),
      user: new FormControl('ADMINISTRADOR', [Validators.required])
    });
  }

  createValidatorsPaciente(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      dni: new FormControl('', [Validators.required, Validators.min(11111111), Validators.max(99999999)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(15)]),
      obra_social: new FormControl('', [Validators.required]),
      user: new FormControl('PACIENTE', [Validators.required])
    });
  }

  createValidatorsEspecialista(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      dni: new FormControl('', [Validators.required, Validators.min(11111111), Validators.max(99999999)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(15)]),
      schedule: new FormControl('', [Validators.required, Validators.pattern("^((0[8-9])|1[0-8]) a ((09)|1[0-9])$")]),
      user: new FormControl('ESPECIALISTA', [Validators.required]),
      status: (false)
    });
  }

  get name() {
    switch (this.kyndUser) {
      case 'Paciente':
        return this.formPaciente.get('name');
      case 'Administrador':
        return this.formAdmin.get('name');
      case 'Especialista':
        return this.formEspecialista.get('name');
    }
  }

  get surname() {
    switch (this.kyndUser) {
      case 'Paciente':
        return this.formPaciente.get('surname');
      case 'Administrador':
        return this.formAdmin.get('surname');
      case 'Especialista':
        return this.formEspecialista.get('surname');
    }
  }

  get age() {
    switch (this.kyndUser) {
      case 'Paciente':
        return this.formPaciente.get('age');
      case 'Administrador':
        return this.formAdmin.get('age');
      case 'Especialista':
        return this.formEspecialista.get('age');
    }
  }

  get dni() {
    switch (this.kyndUser) {
      case 'Paciente':
        return this.formPaciente.get('dni');
      case 'Administrador':
        return this.formAdmin.get('dni');
      case 'Especialista':
        return this.formEspecialista.get('dni');
    }
  }

  get email() {
    switch (this.kyndUser) {
      case 'Paciente':
        return this.formPaciente.get('email');
      case 'Administrador':
        return this.formAdmin.get('email');
      case 'Especialista':
        return this.formEspecialista.get('email');
    }
  }

  get password() {
    switch (this.kyndUser) {
      case 'Paciente':
        return this.formPaciente.get('password');
      case 'Administrador':
        return this.formAdmin.get('password');
      case 'Especialista':
        return this.formEspecialista.get('password');
    }
  }

  get obra_social() {
    return this.formPaciente.get('obra_social');
  }

  get schedule() {
    return this.formEspecialista.get('schedule');
  }

  booleanEspecialidad() {
    this.flagEspecialidad = true;
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'El nombre es Requerido' },
      { type: 'maxlength', message: 'El nombre no puede tener más de 30 caractéres' },
      { type: 'minlength', message: 'El nombre debe tener más de 2 caractéres' }
    ],
    surname: [
      { type: 'required', message: 'El apellido es Requerido' },
      { type: 'maxlength', message: 'El apellido no puede tener más de 30 caractéres' },
      { type: 'minlength', message: 'El apellido debe tener más de 2 caractéres' }
    ],
    age: [
      { type: 'required', message: 'La edad es Requerido' },
      { type: 'min', message: 'Ingrese una edad Válida' },
      { type: 'max', message: 'Ingrese una edad Válida' }
    ],
    dni: [
      { type: 'required', message: 'El DNI es Requerido' },
      { type: 'min', message: 'Ingrese un DNI Válido' },
      { type: 'max', message: 'Ingrese un DNI Válido' }
    ],
    email: [
      { type: 'required', message: 'El correo es Requerido' },
      { type: 'pattern', message: 'Ingrese un correo Válido' },//CHECKEAR
    ],
    password: [
      { type: 'required', message: 'La contraseña es Requerida' },
      { type: 'maxlength', message: 'La contraseña no puede tener más de 30 caractéres' },
      { type: 'minlength', message: 'La contraseña debe tener más de 2 caractéres' }
    ],
    obra_social: [
      { type: 'required', message: 'La obra social es Requerida' },
    ],
    schedule: [
      { type: 'required', message: 'La disponibilidad al público es Requerida' },
      { type: 'pattern', message: 'Ingrese una disponibilidad Válida, ej: 09 a 18' },//CHECKEAR
    ],
  }

  onUpload($event, num: number) {
    if (num == 1) {
      this.photo = $event.target.files[0];
    } else if (num == 2) {
      this.photo2 = $event.target.files[0];
    }
  }

  cleanForm() {
    this.formAdmin = this.createValidatorsAdmin(this.formBuilder);
    this.formPaciente = this.createValidatorsPaciente(this.formBuilder);
    this.formEspecialista = this.createValidatorsEspecialista(this.formBuilder);
  }

  validPhoto(photo: any) {
    if (!photo) { return false; }
    return true;
  }

  async onRegisterPaciente() {
    if (this.validPhoto(this.photo) && this.validPhoto(this.photo2)) {
      await this.authService.register(this.email.value, this.password.value);   //Save user

      //Importante: tanto su ID como photos serán seteadas dentro de UserService.add
      const paciente = new Paciente(
        '',
        this.name.value,
        this.surname.value,
        this.age.value,
        this.dni.value,
        this.obra_social.value,
        this.email.value,
        this.password.value,
        '', '',
        new Date()
      );

      await this.userService.add(paciente, this.photo, this.photo2);  //Save Paciente
      this.router.navigate(['user/login']);
    }
  }

  async onRegisterAdmin() {
    if (this.validPhoto(this.photo)) {
      const { email, password } = this.formAdmin.value;
      await this.authService.register(email, password);   //Save user

      const admin = this.formAdmin.value as Admin;

      await this.userService.add(admin, this.photo);  //Save Paciente
      this.cleanForm();
    }
  }

  async onRegisterEspecialista() {
    if (this.validPhoto(this.photo)) {
      await this.authService.register(this.email.value, this.password.value);   //Save user

      //Importante: tanto su ID como photos serán seteadas dentro de UserService.add

      let schedule = this.schedule.value.split(' ');

      const especialista = new Especialista(
        '',
        this.name.value,
        this.surname.value,
        this.age.value,
        this.dni.value,
        this.especialidadSelected as Especialidad[],
        { start: schedule[0], end: schedule[2] },
        this.email.value,
        this.password.value,
        '', false,
        new Date()
      );

      await this.userService.add(especialista, this.photo);  //Save especialista
      this.router.navigate(['user/login']);
    }
  }

  async onRegister() {
    try {
      switch (this.kyndUser) {
        case 'Paciente': {
          await this.onRegisterPaciente();
          break;
        }
        case 'Especialista': {
          await this.onRegisterEspecialista();
          break;
        }
        case 'Administrador': {
          await this.onRegisterAdmin();
          break;
        }
      }
    }
    catch (error) { }
  }

  onSelect($event) {
    this.especialidadSelected = $event;
  }

  onCaptcha($event){
    this.captcha = $event;    
  }
}
