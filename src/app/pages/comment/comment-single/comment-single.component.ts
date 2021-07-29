import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-comment-single',
  templateUrl: './comment-single.component.html',
  styleUrls: ['./comment-single.component.css']
})
export class CommentSingleComponent implements OnInit {

  @Input() turno: Turno;
  comment: any;

  constructor(private turnoService: TurnoService) { }

  ngOnInit(): void {
    if (this.turno) { this.getComment(); }
  }

  getComment() {    
    this.turnoService.getAll().valueChanges().subscribe((turnos) => {
      turnos.forEach(element => {
        if (element.id === this.turno[0].id) {
          this.comment = element;          
          return;
        }
      });
    });
  }

}
