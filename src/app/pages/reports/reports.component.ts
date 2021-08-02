import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LogService } from 'src/app/services/log.service';

// jsPDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TurnoService } from 'src/app/services/turno.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {

  public form: FormGroup;

  public obs$: Observable<any>;
  public action: string = '';

  public list: any[] = [];

  public doughnut = false;

  // options
  view: any[] = [700, 370];

  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  legendPosition: string = 'below';



  constructor(
    private logService: LogService,
    private turnoService: TurnoService,
    private especialidadService: EspecialidadService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.createValidators(this.formBuilder);
  }

  createValidators(formBuilder: FormBuilder): FormGroup {
    let date: string | Date = new Date();
    date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

    return formBuilder.group({
      dateStart: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}')]),
      dateEnd: new FormControl(date, [Validators.required, Validators.pattern('[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}')]),
    });
  }

  get dateStart() {
    return this.form.get('dateStart');
  }

  get dateEnd() {
    return this.form.get('dateEnd');
  }

  setDates() {
    let date = new Date();
    date.setDate(this.dateStart.value.split('/')[0]);
    date.setMonth(this.dateStart.value.split('/')[1]);
    date.setFullYear(this.dateStart.value.split('/')[2]);

    this.form.controls['dateStart'].setValue(date);

    date = new Date();
    date.setDate(this.dateEnd.value.split('/')[0]);
    date.setMonth(this.dateEnd.value.split('/')[1]);
    date.setFullYear(this.dateEnd.value.split('/')[2]);

    this.form.controls['dateEnd'].setValue(date);
  }

  getLogs() {
    this.action = 'datelogs';

    this.obs$ = this.logService.getAll();
    this.obs$.subscribe(logs => {
      this.list = logs;
      this.mapDate();
      this.filterLogs();
    });
  }

  /* 
    Obligado a hacer esta función porque al momento en que el usuario cierra sesión, se guarda 4 veces el dato
  */
  filterLogs() {
    this.list.forEach(log => {
      let i = this.list.indexOf(log);

      if (log.date.getMinutes() == this.list[i].date.getMinutes()
        && log.date.getMonth() == this.list[i].date.getMonth()
        && log.date.getFullYear() == this.list[i].date.getFullYear()
      ) {
        this.list.splice(i, 1);
      }
    });
  }

  mapDate() {
    this.list.forEach(log => {
      log.date = new Date(log.date.seconds * 1000);
    });
  }

  filterLogsByDate() {
    this.setDates();
    this.action = 'logs';

    this.list.forEach(log => {
      if (
        log.date.getDate() <= this.dateStart.value.getDate()
        || log.date.getDate() >= this.dateEnd.value.getDate()
      ) {
        let i = this.list.indexOf(log);
        this.list.splice(i, 1);
      }
    });
    this.list = this.list.slice(0, 15);
  }

  getPDF() {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      backgroud: 'white',
      scale: 3
    };

    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`clinica-informes.pdf`);
        this.onBack();
      })
  }

  getTurnos() {
    let especialidades: any[] = [];

    this.action = 'quantityByEsp';

    this.obs$ = this.especialidadService.getAll();
    this.obs$.subscribe(esps => {
      especialidades = esps;

      this.obs$ = this.turnoService.getByStatus('Finalizado');
      this.obs$.subscribe(turnos => {

        especialidades.forEach(e => { e.value = 0; });
        especialidades.forEach(esp => {
          turnos.forEach(turno => {
            if (esp.name === turno.especialista.especialidad.name) {
              esp.value++;
            }
          });
        });
        this.list = especialidades;
        this.list = this.list.slice(0, 15);
      })
    });
  }

  getChart() {
    return JSON.parse(JSON.stringify(this.list));
  }

  getQuantity() {
    this.action = 'daysworked';

    this.obs$ = this.turnoService.getByStatus('Finalizado');
    this.obs$.subscribe(turnos => {
      this.list = turnos;

      this.mapDateTurnos();
    });
  }

  sortByEspecialista() {
    this.list = this.list.sort(function (a, b) {
      if (a.especialista.id > b.especialista.id) {
        return 1;
      }
      if (a.especialista.id < b.especialista.id) {
        return -1;
      }
      return 0;
    });
  }

  filterWorksByDate() {
    this.setDates();
    this.action = 'daysworkedPDF';

    this.list.forEach(log => {
      if (
        log.time_updated.getDate() < this.dateStart.value.getDate()
        || log.time_updated.getDate() > this.dateEnd.value.getDate()
      ) {
        let i = this.list.indexOf(log);
        this.list.splice(i, 1);
      }
    });

    this.list.forEach(a => a.value = 1);
    this.filterRepeatEspecialistas();
    this.filterRepeatEspecialistas();

  }

  filterRepeatEspecialistas() {
    for (let i = 0; i < this.list.length - 1; i++) {
      for (let j = i + 1; j < this.list.length; j++) {
        const turnoI = this.list[i];
        const turnoJ = this.list[j];

        if (turnoI.especialista.id == turnoJ.especialista.id) {
          this.list[i].value += this.list[j].value;
          this.list.splice(j, 1);
        }
      }
    }
  }

  mapDateTurnos() {
    this.list.forEach(log => {
      log.time_updated = new Date(log.time_updated.seconds * 1000);
    });
  }

  getDoughnut() {
    this.doughnut = true;
  }

  onBack() {
    this.onClean();
    this.action = '';
    this.doughnut = false;
  }

  onClean() {
    this.form = this.createValidators(this.formBuilder);
  }


}
