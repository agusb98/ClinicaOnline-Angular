import { Component, OnInit, } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Especialidad } from 'src/app/models/especialidad';
import { Especialista } from 'src/app/models/especialista';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turno-add',
  templateUrl: './turno-add.component.html',
  styleUrls: ['./turno-add.component.css']
})
export class TurnoAddComponent implements OnInit {

  public user$: Observable<any>;

  public listTurnos$: Observable<any>;
  public turnos: any[] = [];

  public formTurno: FormGroup;
  public formFilter: FormGroup;

  public listEspecialistas$: Observable<any>;
  public filterEspecialistas: Especialista[] = [];

  public listPacientes$: Observable<any>;
  public filterPacientes: Paciente[] = null;

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
    this.listTurnos$ = this.turnoService.getAll();

    this.listTurnos$.subscribe(turnos => {
      this.turnos = turnos;
    });
  }

  getEspecialistas() {
    this.filterEspecialistas = [];

    this.listEspecialistas$ = this.userService.getEspecialistasWithPermission();
    this.listEspecialistas$.subscribe(especialistas => {
      especialistas.forEach(esp => {
        for (let i = 0; i < esp.especialidad.length; i++) {

          //Genera una copia del Objeto, tonces el obj original no se modifica          
          const auxEsp = JSON.parse(JSON.stringify(esp));
          auxEsp.especialidad = esp.especialidad[i];
          this.filterEspecialistas.push(auxEsp);
        }
      });
    })
  }

  getPacientes() {
    this.filterPacientes = [];

    this.listPacientes$ = this.userService.getByProfile('PACIENTE');
    this.listPacientes$.subscribe(pacientes => {
      this.filterPacientes = pacientes;
    })
  }

  getUser() {
    this.authService.afAuth.user.subscribe(data => {
      if (data && data.email) {
        this.user$ = this.userService.getOne(data.email);

        this.user$.subscribe(userData => {
          if (userData[0].user == 'ADMINISTRADOR') {
            this.getPacientes();
          }
          else { this.paciente = userData[0]; }
        });
      }
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
      day: new FormControl('', [Validators.required, Validators.max(31), Validators.min(1)]),
      time: new FormControl('', [Validators.required, Validators.pattern("^((0[8-9])|1[0-9]):(00|30)$")]),
      status: new FormControl('Pendiente', [Validators.required])
    });
  }

  get status() {
    return this.formTurno.get('status').value;
  }

  get paciente() {
    return this.formTurno.get('paciente').value;
  }

  set paciente(pac: Paciente) {
    this.formTurno.controls['paciente'].setValue(pac);
  }

  get especialista() {
    return this.formTurno.get('especialista').value;
  }
  set especialista(esp: Especialista) {
    this.formTurno.controls['especialista'].setValue(esp);
  }

  get day() {
    return this.formTurno.get('day');
  }

  get time() {
    return this.formTurno.get('time');
  }

  get date(): Date {
    let date = new Date();
    date.setDate(this.day.value);
    date.setHours(this.time.value.split(':')[0]);
    date.setMinutes(this.time.value.split(':')[1]);
    return date;
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
  }

  limitTime() {
    let date: Date = new Date();

    let y: number = date.getFullYear();
    let m: number = date.getMonth();
    let d: number = this.time.value;

    date = new Date(y, m, d);

    if (date.toString().split(' ')[0] === 'Sat' && this.time.value <= 8 || this.time.value >= 14) {
      return false;
    }
    else if (this.time.value <= 8 || this.time.value >= 19) {
      return false;
    }
    return true;
  }

  isSunday(): boolean {
    let date: Date = new Date();

    let y: number = date.getFullYear();
    let m: number = date.getMonth();
    let d: number = + this.day.value;

    date = new Date(y, m, d);

    if (date.toString().split(' ')[0] === 'Sun') {
      return true
    }
    return false;
  }

  limitDays(): boolean {
    const date: Date = new Date();
    if (this.day.value > (date.getDate() + 15) || this.day.value < date.getDate()) {
      return false;
    }
    return true;
  }

  timeWithEspecialista() {
    let time_turno = this.time.value.split(':');
    let time_end_esp = this.especialista.schedule.end;
    let time_start_esp = this.especialista.schedule.start;

    if ((time_turno[0] > time_end_esp) || (time_turno[0] < time_start_esp)) {
      return false;
    }
    if ((time_turno[0] == time_end_esp) || (time_turno[0] == time_start_esp)) {
      if (time_turno[1] == '30' && (time_turno[0] == time_end_esp)) {
        return false;
      }
    }
    return true;
  }

  isEspecialistaBusy(): boolean | any {
    let flag = false;
    this.turnos.forEach(turno => {

      if (turno.especialista.id == this.especialista.id) {

        let status = turno.status == 'Pendiente' || turno.status == 'Aceptado';
        turno.schedule = new Date(turno.schedule.seconds * 1000);

        if (turno.schedule.getDate() == this.date.getDate() &&
          turno.schedule.getHours() == this.date.getHours() &&
          turno.schedule.getMinutes() == this.date.getMinutes() &&
          status
        ) {
          flag = true;
        }
      }
    });
    return flag;
  }

  checkTurno() {
    if (!this.timeWithEspecialista()) {
      this.toastr.error('Asegúrese que el Especialista esté disponible en el horario pactado', 'Datos Erróneos');
      return false;
    }
    if (!this.limitDays()) {
      this.toastr.error('Sólo puede realizar turnos con un máximo de 15 días', 'Datos Erróneos');
      return false;
    }
    if (this.isSunday()) {
      this.toastr.error('No trabajamos los Domingos', 'Datos Erróneos');
      return false;
    }
    if (!this.limitTime()) {
      this.toastr.error('Horarios de Atención: (8 a 19)hs de lunes a viernes | (8 a 14)sabados', 'Datos Erróneos');
      return false;
    }
    if (this.isEspecialistaBusy()) {
      this.toastr.error('El especialista no se encuentra disponible con esos horarios, le recomendamos que reserve el turno para 30 minutos despúes!', 'Vuelve a Probar');
      return false;
    }
    return true;
  }

  onAdd() {
    if (this.checkTurno()) {
      const turno = new Turno(
        '', this.paciente, this.especialista, this.date,
        this.status, new Date()
      );

      this.turnoService.add(turno);  //Save Turno
      this.router.navigate(['/turno/list'])
    }
  }

  clickEspecialista(esp: Especialista) {
    this.especialista = esp;
    this.especialista = esp;

    this.user$.subscribe(userData => {
      if (userData[0].user == 'ADMINISTRADOR') {
        let doc = <HTMLInputElement>document.getElementById('table-especialistas');
        doc.style.display = 'none';

        doc = <HTMLInputElement>document.getElementById('table-pacientes');
        doc.style.display = 'block';
      }
    });
  }

  clickPaciente(pac: Paciente) {
    this.paciente = pac;
  }

  /* 
    Filter List Especialistas by name, surname and especialidad
  */
  onFilter() {
    if (this.filter.length == 0) { this.getEspecialistas(); }

    try {
      this.filter = this.filter.toUpperCase();

      this.filterEspecialistas.forEach(esp => {
        let flagRemove = false;

        for (let i = 0; i < this.filter.length; i++) {
          let r1 = esp.surname[i].toUpperCase() != this.filter[i];
          let r2 = esp.name[i].toUpperCase() != this.filter[i];
          let r3 = esp.especialidad['name'][i].toUpperCase() != this.filter[i];

          if (r1 && r2 && r3) { flagRemove = true; }
        }
        if (flagRemove) {
          let index = this.filterEspecialistas.indexOf(esp);
          this.filterEspecialistas.splice(index, 1);
        }
      });
    }
    catch (error) { console.log(error); }
  }

  onBack() {
    this.router.navigate(['turno/list']);
  }

}
