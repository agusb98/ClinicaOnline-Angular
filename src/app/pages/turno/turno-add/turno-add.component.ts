import { Component, OnInit, } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialista } from 'src/app/models/especialista';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turno-add',
  templateUrl: './turno-add.component.html',
  styleUrls: ['./turno-add.component.css']
})
export class TurnoAddComponent implements OnInit {

  public user: any = new Paciente();
  public listEspecialistas: any[] = [];
  public listTurnos: any[] = [];
  public formTurno: FormGroup;

  public formFilter: FormGroup;
  public filterEspecialistas: any[] = this.listEspecialistas;
  public especialistaSelected: Especialista = new Especialista();

  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnoService,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getTurnos();
    this.getEspecialistas();
    this.formTurno = this.createValidatorsTurno(this.formBuilder);
    this.formFilter = this.createValidatorsFilter(this.formBuilder);
  }

  getTurnos() {
    this.turnoService.getAll().valueChanges().subscribe((data) => {
      this.listTurnos = data;
    });
  }

  getEspecialistas() {
    this.userService.getAll().valueChanges().subscribe((users) => {
      users.forEach(user => {
        if (user.user == 'Especialista' && user.status) {
          this.listEspecialistas.push(user);
        }
      });
    });
  }

  getUser() {
    this.userService.getAll().valueChanges().subscribe((users) => {
      this.authService.afAuth.user.subscribe(data => {
        try {
          users.forEach(element => {
            if (data.email == element.email) {
              this.user = element;
            }
          });
        } catch (error) { }
      });
    });
  }

  createValidatorsFilter(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      filter: new FormControl(''),
    });
  }

  get filter(): string {
    return this.formFilter.get('filter').value;
  }
  set filter(str: string) {
    this.formFilter.controls['filter'].setValue(str);
  }

  createValidatorsTurno(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      paciente: new FormControl(''),
      especialista: new FormControl('', [Validators.required]),
      date: new FormControl(''),
      day: new FormControl('', [Validators.required/* , this.limitDays, this.sunday */, Validators.max(31), Validators.min(1)]),
      time: new FormControl('', [Validators.required/* , this.limitTime */, Validators.pattern("^((0[8-9])|1[0-9]):(00|30)$")]),
      especialidad: new FormControl('', [Validators.required]),
      status: new FormControl('Pendiente', [Validators.required])
    });
  }

  limitTime(control: AbstractControl): null | object {
    let date: Date = new Date();

    let y: number = date.getFullYear();
    let m: number = date.getMonth();
    let d: number = control.value;

    console.log(d);


    date = new Date(y, m, d);

    if (date.toString().split(' ')[0] === 'Sat' && control.value <= 8 || control.value >= 14) {
      return { type: 'limittime' };
    }
    else if (control.value <= 8 || control.value >= 19) {
      return { type: 'limittime' };
    }
    return null;
  }

  sunday(control: AbstractControl): any {
    let date: Date = new Date();

    let y: number = date.getFullYear();
    let m: number = date.getMonth();
    let d: number = + control.value;

    date = new Date(y, m, d);

    if (date.toString().split(' ')[0] === 'Sun') {
      return { error: true };
    }
    return null;
  }

  limitDays(control: AbstractControl): null | object {
    const date: Date = new Date();

    if (control.value > (date.getDate() + 15)) {
      return { type: 'limitday' };
    }
    return { type: 'success' };
  }

  set paciente(pac: any) {
    this.formTurno.controls['paciente'].setValue(pac);
  }

  get especialista() {
    return this.formTurno.get('especialista').value;
  }
  set especialista(esp: any) {
    this.formTurno.controls['especialista'].setValue(esp);
  }

  get day() {
    return this.formTurno.get('day');
  }

  get time() {
    return this.formTurno.get('time');
  }

  get especialidad() {
    return this.formTurno.get('especialidad').value;
  }
  set especialidad(str: string) {
    this.formTurno.controls['especialidad'].setValue(str);
  }

  public errorMessages = {
    especialistaId: [
      { type: 'required', message: 'El especialista es Requerido' },
    ],
    day: [
      { type: 'required', message: 'La fecha es Requerida' },
      { type: 'min', message: 'La fecha es Inválida' },
      { type: 'max', message: 'La fecha es Inválida' },
      { type: 'limitday', message: 'La fecha debe ser dentro de los próximos 15 días' },
      { type: 'sunday', message: 'Los domingos no se trabaja' },
    ],
    especialidad: [
      { type: 'required', message: 'La especialidad es Requerida' },
    ],
    time: [
      { type: 'required', message: 'La Hora es Requerida' },
      { type: 'pattern', message: 'La Hora es Invalida, ej: 12:30' },
      { type: 'limittime', message: 'El Horario es de: 08hs a 19hs(días hábiles) y 08hs a 14hs(sábados)' }
    ]
  }

  cleanForm() {
    this.formTurno = this.createValidatorsTurno(this.formBuilder);
    this.especialistaSelected = new Especialista();
  }

  setValuesTurno() {
    //add paciente ID
    this.paciente = this.user;

    //add field date in Turno
    let date: any = new Date();

    let y: number = date.getFullYear();
    let m: number = date.getMonth();
    let d: number = + this.day.value;

    let h: number = + this.time.value.split(':')[0];
    let t: number = + this.time.value.split(':')[1];

    date = d + '/' + m + '/' + y + ' ' + h + ':' + t;
    this.formTurno.controls['date'].setValue(date);
  }

  checkTurno() {
    let flag = true;
    const date = this.formTurno.controls['date'].value;

    this.listTurnos.forEach(tur => {
      if (tur.especialista == this.especialista && tur.date == date) {
        flag = false;
      }
    });
    return flag;
  }

  async onAdd() {
    try {
      this.setValuesTurno();
      if (this.checkTurno()) {
        const turno = this.getValues();
        this.turnoService.add(turno);  //Save Turno
        this.router.navigate(['/home'])
      }
      else { this.toastr.error('Este horario no se encuentra disponible', 'Status Turno'); }
    }
    catch (error) { console.log(error); }
  }
  getValues() {
    return {
      id: this.formTurno.value.id,
      date: this.formTurno.value.date,
      especialidad: this.formTurno.value.especialidad,
      especialista: this.formTurno.value.especialista,
      paciente: this.formTurno.value.paciente,
      status: this.formTurno.value.status,
    };
  }

  clickEspecialista(esp: Especialista) {
    this.especialista = esp;
    this.especialidad = esp.especialidad;
    this.especialistaSelected = esp;
  }

  /* 
    Filter List Especialistas by name, surname and especialidad
  */
  onFilter() {
    this.filterEspecialistas = this.listEspecialistas; //Refresh list with all Especialistas
    try {
      this.filter = this.filter[0].toUpperCase() + this.filter.slice(1);

      this.filterEspecialistas = this.listEspecialistas.filter((data) => {        
        for (let i = 0; i < this.filter.length; i++) {
          let r1 = this.filter[i] != data.surname[i];
          let r2 = data.name[i] != this.filter[i];
          let r3 = data.especialidad[i] != this.filter[i];

          if (r1 && r2 && r3) { return false; }
        }
        return true;
      });
    }
    catch (error) { console.log(error); }
  }
}
