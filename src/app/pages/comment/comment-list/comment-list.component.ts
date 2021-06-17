import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() turno: Turno;

  listComments: any[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    if (this.turno) { this.getCommentsByEspecialista(); }
    else { this.getComments() }
  }

  

  getCommentsByEspecialista() {
    this.commentService.getAll().valueChanges().subscribe((com) => {
      com.forEach(element => {
        if (element.especialista.id === this.turno[0].especialista.id) {
          this.listComments.push(element);
        }
      });
    });
  }
  getComments() {
    this.commentService.getAll().valueChanges().subscribe((data) => {
        this.listComments = data;
    });
  }

}
