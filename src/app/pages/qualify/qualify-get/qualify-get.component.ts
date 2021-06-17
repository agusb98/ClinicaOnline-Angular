import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-qualify-get',
  templateUrl: './qualify-get.component.html',
  styleUrls: ['./qualify-get.component.css']
})
export class QualifyGetComponent implements OnInit {

  @Input() turno: Turno;
  qualify: number;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }
  /* getQualificationByTurno() {
    this.commentService.getAll().valueChanges().subscribe((com) => {
      com.forEach(element => {
        if (element.especialista.id === this.turno[0].especialista.id) {
          this.listComments.push(element);
        }
      });
    });
  } */


}
