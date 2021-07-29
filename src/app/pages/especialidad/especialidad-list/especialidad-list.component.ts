import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from 'src/app/models/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.component.html',
  styleUrls: ['./especialidad-list.component.css']
})
export class EspecialidadListComponent implements OnInit {

  list$: Observable<Especialidad[]>;
  auxListSelected: Especialidad[] = [];

  @Output() listSelected: EventEmitter<Especialidad[]> = new EventEmitter();

  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.list$ = this.especialidadService.getAll();
  }

  cleanList() {
    this.list$ = null;
  }

  checkEspecialidad(name: string) {
    if (name.length < 3) {
      return false;
    }

    let flag = true;

    this.list$.forEach(esp => {
      if (esp['name'].toUpperCase() == name) {
        flag = false;
      }
    });

    return flag;
  }

  onClickAdd() {
    var inputValue = (<HTMLInputElement>document.getElementById('input-name')).value;

    if (this.checkEspecialidad(inputValue)) {
      this.especialidadService.add(new Especialidad('', inputValue));
    }
  }

  onClickEspecialidad($event: Especialidad) {
    this.checkEspecialidadSelected($event);
    this.listSelected.emit(this.auxListSelected);
    this.setValueButton($event);
  }

  setValueButton($event: Especialidad) {
    let btn = document.getElementById('button-select-esp-' + $event.id);

    if (btn.innerText === 'Seleccionar') {
      btn.innerText = 'Seleccionado';
    }
    else {
      btn.innerText = 'Seleccionar';
    }
  }

  /* 
    Check if Especialidad is Selected, in that case it removes. Or push 
  */
  checkEspecialidadSelected($selected: Especialidad): boolean {
    let flag = true;

    for (let i = 0; i < this.auxListSelected.length; i++) {
      const esp = this.auxListSelected[i];

      if (esp.name.toUpperCase() === $selected.name.toUpperCase()) {
        this.auxListSelected.splice(i, 1);
        flag = false;
      }
    }

    if (flag) { this.auxListSelected.push($selected); }
    return flag;
  }
}
