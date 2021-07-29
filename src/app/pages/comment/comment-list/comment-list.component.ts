import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() turno: Turno;

  user: any;

  list: any[] = [];
  list$: Observable<any> = null;

  constructor(
    private turnoService: TurnoService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.afAuth.user.subscribe(data => {
      if(data && data.email){
        this.userService.getOne(data.email).subscribe(user => {
          this.user = user[0] as User;
          this.getComments();
        })
      }
    });
  }

  getComments() {
    if (this.turno) { this.getByTurno(); }
    else if (this.user.user == 'ESPECIALISTA') { this.getByEspecialista(this.user.email); }
    else { this.getAll() }
  }

  getByTurno() {
    this.list$ = this.turnoService.getByEmailEspecialista(this.turno[0].especialista.email);
    console.log(1);

    this.list$.subscribe((turnos) => {
      this.list = turnos;
      this.setDateFormat();
    });
  }

  getByEspecialista(email: string) {
    this.list$ = this.turnoService.getByEmailEspecialista(email);

    this.list$.subscribe((turnos) => {
      this.list = turnos;
      this.setDateFormat();
    });
  }

  getAll() {
    this.list$ = this.turnoService.getAll();

    this.list$.subscribe((turnos) => {
      this.list = turnos;
      this.setDateFormat();
    });
  }

  setDateFormat() {
    this.list.map(a => {
      let date: any = a.time_updated;
      date = new Date(date.seconds * 1000);
      a.time_updated = date;
    });
  }
}
