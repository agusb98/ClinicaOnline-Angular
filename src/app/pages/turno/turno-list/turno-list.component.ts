import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.css']
})
export class TurnoListComponent implements OnInit {

  user: Paciente;
  listTurnos: any[] = [];

  public formFilter: FormGroup;
  public filterTurnos: any[] = this.listTurnos;

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

  clean() {
    this.listTurnos = [];
    this.filterTurnos = [];
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
              this.getTurnos();
            }
          });
        } catch (error) { console.log(error); }
      });
    });
  }

  getTurnos() {
    this.turnoService.getAll().valueChanges().subscribe((turnos) => {
      turnos.forEach(element => {
        if (element.paciente.id == this.user.id) {
          this.listTurnos.push(element);
        }
      });
    });
  }
}
