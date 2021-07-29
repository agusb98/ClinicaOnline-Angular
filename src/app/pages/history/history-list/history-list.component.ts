import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';

// jsPDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  list$: Observable<Turno[]>;
  list: any[] = [];

  action: string = '';
  user: User = null;

  public formFilter: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnoService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getTurnos();
    this.formFilter = this.createValidatorsFilter(this.formBuilder);
  }

  getTurnosByAdmin() {
    this.list$ = this.turnoService.getAll();
    this.list$.subscribe(turnos => {
      this.list = turnos;
      this.spliceTurnos();
    });
  }

  getTurnosByEspecialista(email: string) {
    this.list$ = this.turnoService.getByEmailEspecialista(email);
    this.list$.subscribe(turnos => {

      this.list = turnos;
      this.spliceTurnos();
      this.list.sort(this.compare);
    });
  }

  getTurnos() {
    this.list = [];

    this.authService.afAuth.user.subscribe(user => {
      if (user && user.email) {
        this.userService.getOne(user.email).subscribe(dataUser => {
          this.user = dataUser[0];

          switch (this.user.user) {
            case 'ADMINISTRADOR':
              this.getTurnosByAdmin();
              break;
            case 'ESPECIALISTA':
              this.getTurnosByEspecialista(this.user.email);
              break;
          }
        });
      }
    });
  }

  compare(a, b) {
    if (a.time_updated > b.time_updated) { return -1; }
    if (a.time_updated < b.time_updated) { return 1; }
    return 0;
  }

  spliceTurnos() {
    for (let i = 0; i < this.list.length - 1; i++) {
      for (let j = i + 1; j < this.list.length; j++) {
        if (this.list[i].paciente.email == this.list[j].paciente.email) {
          this.list.splice(j, 1);
        }
      }
    }
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
    Filter List Especialistas by name, surname and especialidad
  */
  onFilter() {
    if (this.filter.length == 0) { this.getTurnos(); }

    try {
      this.filter = this.filter.toUpperCase();

      this.list.forEach(tur => {
        let flagRemove = false;

        for (let i = 0; i < this.filter.length; i++) {

          let r1 = tur.paciente.surname[i].toUpperCase() != this.filter[i];
          let r2 = tur.paciente.name[i].toUpperCase() != this.filter[i];
          let r3 = tur.history?.height != this.filter[i];
          let r4 = tur.history?.weight != this.filter[i];
          let r5 = tur.history?.temperature != this.filter[i];
          let r6 = tur.history?.pressure != this.filter[i];

          if (r1 && r2 && r3 && r4 && r5 && r6) { flagRemove = true; }

          if (flagRemove) {
            let index = this.list.indexOf(tur);
            this.list.splice(index, 1);
          }
        }
      });
    }
    catch (error) { console.log(error); }
  }

  getHistory(emailPac: string, emailEsp: string) {
    this.action = 'Detailes';
    this.list = [];
    this.list$ = this.turnoService.getByEmailPacienteAndEspecialista(emailPac, emailEsp);

    this.list$.subscribe(turnos => {
      this.list = turnos;
      this.list.sort(this.compare);
    });
  }

  getHistoryXLSX() {
    //const table2excel = new Table2Excel();
    // const table2Excel = new Table2Excel();
    // table2excel.export(document.querySelectorAll('htmlData'));
  }

  getHistoryPDF() {
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
        docResult.save(`clinica.pdf`);
        this.onBack();
      })
  }

  onBack() {
    this.action = '';
    this.getTurnos();
  }
}
