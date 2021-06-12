import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { Especialista } from 'src/app/models/especialista';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  photo: any = null;
  photo2: any = null;

  @Input() isAdmin = false;

  public kyndUser = 'Paciente';
  public formAdmin: FormGroup = this.formBuilder.group({});
  public formPaciente: FormGroup = this.formBuilder.group({});
  public formEspecialista: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.formAdmin = this.createValidatorsAdmin(this.formBuilder);
    this.formPaciente = this.createValidatorsPaciente(this.formBuilder);
    this.formEspecialista = this.createValidatorsEspecialista(this.formBuilder);
  }

  createValidatorsAdmin(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      dni: new FormControl('', [Validators.required, Validators.min(11111111), Validators.max(99999999)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(15)]),
      user: new FormControl('Administrador', [Validators.required])
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
      user: new FormControl('Paciente', [Validators.required])
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
      user: new FormControl('Especialista', [Validators.required]),
      especialidad: new FormControl('', [Validators.required]),
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

  get especialidad() {
    return this.formPaciente.get('especialidad');
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
    especialidad: [
      { type: 'required', message: 'La especialidad es Requerida' },
    ]
  }

  onUpload($event, num: number) {
    if (num == 1) {
      this.photo = $event.target.files[0];
    } else if (num == 2) {
      this.photo2 = $event.target.files[0];
    }
  }

  cleanForm() {
    this.formAdmin.reset();
    this.formEspecialista.reset();
    this.formAdmin.reset();
    this.photo = null;
    this.photo2 = null;
  }

  validPhoto(photo: any) {
    if (!photo) { return false; }
    return true;
  }

  async onRegisterPaciente() {
    if (this.validPhoto(this.photo) && this.validPhoto(this.photo2)) {
      const { email, password } = this.formPaciente.value;
      await this.authService.register(email, password);   //Save user
      this.formPaciente.removeControl('password');

      const paciente = this.formPaciente.value as Paciente;
      await this.userService.add(paciente, this.photo, this.photo2);  //Save Paciente

      this.cleanForm();
      this.router.navigate(['user/login']);
    }
  }

  async onRegisterAdmin() {
    if (this.validPhoto(this.photo)) {
      const { email, password } = this.formAdmin.value;
      await this.authService.register(email, password);   //Save user
      this.formAdmin.removeControl('password');

      const admin = this.formAdmin.value as Admin;

      await this.userService.add(admin, this.photo);  //Save Paciente
      this.cleanForm();
    
      this.router.navigate(['user/login']);
    }
  }

  async onRegisterEspecialista() {
    if (this.validPhoto(this.photo)) {
      const { email, password } = this.formEspecialista.value;
      await this.authService.register(email, password);   //Save user
      this.formPaciente.removeControl('password');

      const espe = this.formEspecialista.value as Especialista;
      await this.userService.add(espe, this.photo);  //Save Paciente

      this.cleanForm();
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
}
