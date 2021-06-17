import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-single',
  templateUrl: './comment-single.component.html',
  styleUrls: ['./comment-single.component.css']
})
export class CommentSingleComponent implements OnInit {

  @Input() turno: Turno;
  comment: any;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    if (this.turno) { this.getComment(); }
  }

  getComment() {
    console.log(this.turno);
    
    this.commentService.getAll().valueChanges().subscribe((com) => {
      com.forEach(element => {
        if (element.id === this.turno[0].id) {
          this.comment = element;
          return;
        }
      });
    });
  }

}
