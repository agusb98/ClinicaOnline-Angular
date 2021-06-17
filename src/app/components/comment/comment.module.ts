import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from 'src/app/pages/comment/comment-list/comment-list.component';
import { TurnoListComponent } from 'src/app/pages/turno/turno-list/turno-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommentRoutingModule } from './comment-routing.module';
import { QualifyGetComponent } from 'src/app/pages/qualify/qualify-get/qualify-get.component';
import { SurveyGetComponent } from 'src/app/pages/survey/survey-get/survey-get.component';
import { CommentSingleComponent } from 'src/app/pages/comment/comment-single/comment-single.component';

@NgModule({
  declarations: [
    CommentListComponent,
    TurnoListComponent,
    QualifyGetComponent,
    SurveyGetComponent,
    CommentSingleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CommentRoutingModule,
  ]
})
export class CommentModule { }
