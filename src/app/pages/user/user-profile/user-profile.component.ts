import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

// jsPDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public user$: Observable<User[]>;
  public userData: User;

  turnos: Turno[] = null;
  public action: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private turnoService: TurnoService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.afAuth.user.subscribe(data => {
      if (data && data.email) {
        this.user$ = this.userService.getOne(data.email);
        this.user$.subscribe(data => { this.userData = data[0]; })

        this.getTurnos(data.email);
      }
    });
  }

  getTurnos(email: string) {
    this.turnoService.getByEmailPaciente(email).subscribe(turnos => {
      this.turnos = turnos;
    });
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
        docResult.save(`${this.userData.surname}_clinica.pdf`);
        this.onBack();
      })
  }

  getHistory() {
    this.action = 'Download';
  }

  onBack() {
    this.action = '';
  }
}
