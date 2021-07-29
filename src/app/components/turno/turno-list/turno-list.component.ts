import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { Turno } from 'src/app/models/turno';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.css']
})
export class TurnoListComponent implements OnInit {

  user$: Observable<any>;
  user: User = null;

  public formGroup: FormGroup;

  public listTurnos$: Observable<Turno[]>;
  public filterTurnos: Turno[];

  @Output() flagComponent = '';
  @Output() turnoSelected: Turno;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private turnoService: TurnoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.createValidatorsFilter(this.formBuilder);
    this.getTurnos();
  }

  /* 
    Obtiene los datos del usuario logeado y luego obtiene sus respectivos turnos
  */
  getTurnos() {
    this.authService.afAuth.user.subscribe(data => {
      if (data && data.email) {
        this.user$ = this.userService.getOne(data.email);

        this.user$.subscribe(user => {
          this.user = user[0] as User;

          this.getTurnosByUser();
        })
      }
    });
  }

  getTurnosByUser() {
    this.listTurnos$ = this.filterTurnos = null;
    this.filter = '';

    switch (this.user.user) {
      case 'ADMINISTRADOR':
        this.listTurnos$ = this.turnoService.getAll();
        break;
      case 'ESPECIALISTA':
        this.listTurnos$ = this.turnoService.getByEmailEspecialista(this.user.email);
        break;
      case 'PACIENTE':
        this.listTurnos$ = this.turnoService.getByEmailPaciente(this.user.email);
        break;
    }
    this.listTurnos$.subscribe(data => { this.filterTurnos = data; });
  }

  createValidatorsFilter(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      filter: new FormControl(''),
    });
  }

  get filter(): string {
    return this.formGroup.get('filter').value;
  }
  set filter(str: string) {
    this.formGroup.controls['filter'].setValue(str);
  }

  /* 
    Filter Turnos List by name, surname or especialidad of user Paciente
  */
  onFilter() {
    if (this.filter.length == 0) {
      this.listTurnos$.subscribe(data => { this.filterTurnos = data; });
    }
    else {
      this.filter = this.filter.toUpperCase();

      this.filterTurnos = this.filterTurnos.filter(turno => {
        let i = this.filter.length;

        return turno.paciente.name.toUpperCase()[i] != this.filter[i]
          && turno.paciente.surname.toUpperCase()[i] != this.filter[i]
          && turno.especialista.name.toUpperCase()[i] != this.filter[i]
          && turno.especialista.surname.toUpperCase()[i] != this.filter[i]
          && turno.especialista.especialidad['name'].toUpperCase()[i] != this.filter[i]
      });
      console.log(this.filterTurnos);

    }
  }

  async getAll() {
    this.listTurnos$ = this.turnoService.getAll();
    this.listTurnos$.subscribe(data => { this.filterTurnos = data; });
  }

  get height() {
    return this.formGroup.get('height');
  }

  get weight() {
    return this.formGroup.get('weight');
  }

  get temperature() {
    return this.formGroup.get('temperature');
  }

  get pressure() {
    return this.formGroup.get('pressure');
  }

  createValidatorsHistory(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      height: new FormControl('', [Validators.required, Validators.max(3), Validators.min(0.5)]),
      weight: new FormControl('', [Validators.required, Validators.max(200), Validators.min(2)]),
      temperature: new FormControl('', [Validators.required, Validators.max(45), Validators.min(25)]),
      pressure: new FormControl('', [Validators.required])
    });
  }

  createValidatorsComment(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      comment: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(500)])
    });
  }

  get comment() {
    return this.formGroup.get('comment');
  }

  public errorMessages = {
    comment: [
      { type: 'required', message: 'El comentario es Requerido' },
      { type: 'maxlength', message: 'El comentario no puede tener más de 500 caractéres' },
      { type: 'minlength', message: 'El comentario debe tener más de 15 caractéres' }
    ],
    recommend: [
      { type: 'required', message: 'La recomendación es Requerida' },
      { type: 'maxlength', message: 'Debe tener como máximo 500 caractéres' },
      { type: 'minlength', message: 'Debe tener como mínimo 10 caractéres' }
    ],
    fixed: [
      { type: 'required', message: 'La solución que tuvo es Requerida' },
      { type: 'maxlength', message: 'Debe tener como máximo 500 caractéres' },
      { type: 'minlength', message: 'Debe tener como mínimo 10 caractéres' }
    ],
    atention: [
      { type: 'required', message: 'La atención que tuvo es Requerida' },
      { type: 'max', message: 'Se puntúa del 0 al 5' },
      { type: 'min', message: 'Se puntúa del 0 al 5' }
    ],
    height: [
      { type: 'required', message: 'La altura es Requerida' },
      { type: 'max', message: 'Ingrese una altura válida' },
      { type: 'min', message: 'Ingrese una altura válida' }
    ],
    weight: [
      { type: 'required', message: 'El peso es Requerido' },
      { type: 'max', message: 'Ingrese un peso válido' },
      { type: 'min', message: 'Ingrese un peso válido' }
    ],
    temperature: [
      { type: 'required', message: 'La temperatura es Requerida' },
      { type: 'max', message: 'Ingrese una temperatura válida' },
      { type: 'min', message: 'Ingrese una temperatura válida' }
    ],
    pressure: [
      { type: 'required', message: 'La presión es Requerida' }
    ]
  }

  onCancel(turno: Turno) {
    this.formGroup = this.createValidatorsComment(this.formBuilder);
    this.turnoSelected = turno;
    this.flagComponent = 'Cancel';
  }

  async confirmCancel() {
    this.turnoSelected.time_updated = new Date();
    this.turnoSelected.status = 'Cancelado';
    if (this.user.user == 'ADMINISTRADOR' || this.user.user == 'ESPECIALISTA') {
      this.turnoSelected.commentEspecialista = this.comment.value;
    }

    if (this.user.user == 'PACIENTE') {
      this.turnoSelected.commentPaciente = this.comment.value;
    }
    await this.turnoService.update(this.turnoSelected);   //Save turno
    this.onBack();
  }

  async onAcept(turno: Turno) {
    turno.status = 'Aceptado';
    turno.time_updated = new Date();

    await this.turnoService.update(turno);   //Save turno
    this.onBack();
  }

  onRefuse(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'Refuse';

    this.formGroup = this.createValidatorsComment(this.formBuilder);
  }

  async confirmRefuse() {
    this.turnoSelected.status = 'Rechazado';
    this.turnoSelected.time_updated = new Date();
    this.turnoSelected.commentEspecialista = this.comment.value;

    await this.turnoService.update(this.turnoSelected);   //Save turno
    this.onBack();
  }

  onShowComments(turno: Turno) {
    let date: any = turno.time_updated;
    date = new Date(date.seconds * 1000);
    turno.time_updated = date;

    this.turnoSelected = turno;
    this.flagComponent = 'Comments';
  }

  onShowComment(turno: Turno) {
    let date: any = turno.time_updated;
    date = new Date(date.seconds * 1000);
    turno.time_updated = date;

    this.turnoSelected = turno;
    this.flagComponent = 'Comment';
  }

  createValidatorsSurvey(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      recommend: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      fixed: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      comment: new FormControl('')
    });
  }

  onSurvey(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'Survey';

    this.formGroup = this.createValidatorsSurvey(this.formBuilder);
  }

  get recommend() {
    return this.formGroup.get('recommend');
  }

  get atention() {
    return this.formGroup.get('atention');
  }

  get fixed() {
    return this.formGroup.get('fixed');
  }

  async confirmSurvey() {
    this.turnoSelected.time_updated = new Date();
    this.turnoSelected.commentPaciente = this.comment.value;
    this.turnoSelected.survey = [
      { recommend: this.recommend.value },
      { fixed: this.fixed.value }
    ]

    await this.turnoService.update(this.turnoSelected);   //Save turno
    this.onBack();
  }

  createValidatorsQualify(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      atention: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    });
  }

  onQualify(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'Qualify';

    this.formGroup = this.createValidatorsQualify(this.formBuilder);
  }

  async confirmQualify() {
    this.turnoSelected.time_updated = new Date();
    this.turnoSelected.qualify = [{ atention: this.atention.value, }];

    await this.turnoService.update(this.turnoSelected);   //Save turno
    this.onBack();
  }

  onFinish(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'Finish';

    this.formGroup = this.createValidatorsComment(this.formBuilder);
  }

  async confirmFinish() {
    this.turnoSelected.status = 'Finalizado';
    this.turnoSelected.time_updated = new Date();
    this.turnoSelected.commentEspecialista = this.comment.value;

    await this.turnoService.update(this.turnoSelected);   //Save turno
    this.onBack();
  }

  onAddHistory(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'History';

    this.formGroup = this.createValidatorsHistory(this.formBuilder);
  }

  cleanHistory() {
    this.formGroup = this.createValidatorsHistory(this.formBuilder);
  }

  addDataOnHistory() {
    let docs = document.getElementsByClassName('error-message');
    Array.prototype.map.call(docs, function (doc) {
      doc.hidden = false;
    });

    docs = document.getElementsByClassName('form-dinamic');
    Array.prototype.map.call(docs, function (doc) {
      doc.hidden = false;
    });
  }

  getNewDataOfHistory() {
    let arr: { clave: string, valor: string | number }[] = [];

    let array_clave: string[] = [];
    let array_valor: string[] = [];

    let docs_clave = document.getElementsByClassName('clave');
    let docs_valor = document.getElementsByClassName('valor');

    Array.prototype.map.call(docs_clave, function (doc) {
      if (doc.value) {
        array_clave.push(doc.value);
      }
    });

    Array.prototype.map.call(docs_valor, function (doc) {
      if (doc.value) {
        array_valor.push(doc.value);
      }
    });

    for (let index = 0; index < array_clave.length; index++) {
      let clave = array_clave[index];
      let valor = array_valor[index];

      arr.push({ clave, valor });
    }
    return arr;
  }

  async confirmHistory() {
    this.turnoSelected.time_updated = new Date();
    this.turnoSelected.history = {
      height: this.height.value,
      weight: this.weight.value,
      temperature: this.temperature.value,
      pressure: this.pressure.value,
      others: this.getNewDataOfHistory()
    }
    await this.turnoService.update(this.turnoSelected);   //Save turno
    this.onBack();
  }

  async clean() {
    this.listTurnos$ = null;
    this.filterTurnos = null;
    this.formGroup = this.createValidatorsFilter(this.formBuilder);
  }

  onAdd() {
    this.router.navigate(['turno/add']);
  }

  onBack() {
    this.listTurnos$.subscribe(data => { this.filterTurnos = data; });
    this.flagComponent = '';
    this.formGroup = this.createValidatorsFilter(this.formBuilder);
  }
}
