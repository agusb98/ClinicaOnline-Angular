import { NgModule } from '@angular/core';
import { CommentListComponent } from 'src/app/pages/comment/comment-list/comment-list.component';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentSingleComponent } from 'src/app/pages/comment/comment-single/comment-single.component';

@NgModule({
  imports: [
    CommentRoutingModule,
  ],
  declarations: [
    CommentListComponent,
    CommentSingleComponent
  ]
})
export class CommentModule { }
