import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  public kyndUser = 'Paciente';
  public formUser: FormGroup = this.formBuilder.group({});
  public formPaciente: FormGroup = this.formBuilder.group({});
  public formEspecialista: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private pacienteService: PacienteService,
    private especialistaService: EspecialistaService,
    private router: Router,
  ) {
    this.formUser = this.createValidatorsUser(this.formBuilder);
    this.formPaciente = this.createValidatorsPaciente(this.formBuilder);
    this.formEspecialista = this.createValidatorsEspecialista(this.formBuilder);
  }

  createValidatorsUser(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  createValidatorsPaciente(formBuilder: FormBuilder): FormGroup {
    
    return formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'age': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(8), Validators.minLength(8)]],
      'obra_social': ['', Validators.required],
      'photo1': ['', Validators.required],
      'photo2': ['', Validators.required]
    });
  }

  createValidatorsEspecialista(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'age': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(8)]],
      'especialidad': ['', Validators.required],
      'photo': ['', Validators.required]
    });
  }

  async onRegister() {
    const { email, password } = this.formUser.value;

     try {
      const user = await this.authService.register(email, password);
      if (user) {
        switch(this.kyndUser){
          case 'Paciente':{ //No idea how to set value email, so in next function solve it
            await this.pacienteService.add(this.formPaciente.getRawValue(), email);
          }
          case 'Especialista':{
            await this.especialistaService.add(this.formEspecialista.getRawValue(), email);
          }
        }
        this.router.navigate(['/home']);  //Redirect to homepage
      }
    }
    catch (error) { }
  }

  /* saveRefPhoto(ref: string) {
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(ref);
    spaceRef.getDownloadURL().then(url => {
      this.pathFoto = url
    });
  } */
}
