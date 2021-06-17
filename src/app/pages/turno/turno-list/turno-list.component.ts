import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Especialista } from 'src/app/models/especialista';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.css']
})
export class TurnoListComponent implements OnInit {

  user: any;
  listTurnos: any[] = [];

  public formFilter: FormGroup;
  public filterTurnos: any[] = [];

  public flagComponent = '';

  @Output() turnoSelected: Turno;
  @Output() kyndUser: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private turnoService: TurnoService,
  ) { }

  ngOnInit(): void {
    this.getPaciente();
    this.formFilter = this.createValidatorsFilter(this.formBuilder);
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

  /* 
    Filter Turnos List by name, surname or especialidad of user Especialista
  */
  onFilter() {
    this.filterTurnos = this.listTurnos; //Refresh list with all Turnos
    try {
      this.filter = this.filter[0].toUpperCase() + this.filter.slice(1);

      this.filterTurnos = this.listTurnos.filter((data) => {
        for (let i = 0; i < this.filter.length; i++) {
          let r1 = this.filter[i] != data.especialista.surname[i];
          let r2 = data.especialista.name[i] != this.filter[i];
          let r3 = data.especialista.especialidad[i] != this.filter[i];

          if (r1 && r2 && r3) { return false; }
        }
        return true;
      });
    }
    catch (error) { console.log(error); }
  }

  getPaciente() {
    this.userService.getAll().valueChanges().subscribe((users) => {
      this.authService.afAuth.user.subscribe(data => {
        try {
          users.forEach(element => {
            if (data.email == element.email) {
              this.user = element;
              if (this.user.user == 'Administrador') {
                this.getAll();
              }
              else {
                this.getTurnos();
              }
            }
          });
        } catch (error) { console.log(error); }
      });
    });
  }

  async getAll() {
    this.turnoService.getAll().valueChanges().subscribe(async (turnos) => {
      this.listTurnos = turnos;
      this.filterTurnos = turnos;
      this.kyndUser = 'Administrador';
    });
  }

  async getTurnos() {
    this.turnoService.getAll().valueChanges().subscribe(async (turnos) => {
      turnos.forEach(element => {
        if (element.paciente.id == this.user.id) {
          this.kyndUser = 'Paciente';
          this.listTurnos.push(element);
          this.filterTurnos.push(element);
        }
        else if (element.especialista.id == this.user.id) {
          this.kyndUser = 'Especialista';
          this.listTurnos.push(element);
          this.filterTurnos.push(element);
        }
      });
    });
  }

  onCancel(turno: Turno) {
    turno.status = 'Cancelado';
    this.turnoSelected = turno;
    this.flagComponent = 'Cancel';
  }

  onShowComments(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'Comments';
  }

  onShowComment(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'Comment';
  }

  onSurvey(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'Survey';
  }

  onQualify(turno: Turno) {
    this.turnoSelected = turno;
    this.flagComponent = 'Qualify';
  }

  async clean() {
    this.listTurnos = [];
    this.filterTurnos = [];
    this.formFilter = this.createValidatorsFilter(this.formBuilder);
  }
}
