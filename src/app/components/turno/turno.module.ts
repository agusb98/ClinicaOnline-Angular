import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TurnoRoutingModule } from './turno-routing.module';
import { TurnoListComponent } from 'src/app/pages/turno/turno-list/turno-list.component';
import { TurnoAddComponent } from 'src/app/pages/turno/turno-add/turno-add.component';
import { TurnoCancelComponent } from 'src/app/pages/turno/turno-cancel/turno-cancel.component';
import { CommentListComponent } from 'src/app/pages/comment/comment-list/comment-list.component';
import { SurveyAddComponent } from 'src/app/pages/survey/survey-add/survey-add.component';
import { QualifyAddComponent } from 'src/app/pages/qualify/qualify-add/qualify-add.component';
import { CommentSingleComponent } from 'src/app/pages/comment/comment-single/comment-single.component';

@NgModule({
  declarations: [
    TurnoListComponent, 
    TurnoCancelComponent, 
    TurnoAddComponent, 
    SurveyAddComponent,
    CommentListComponent,
    CommentSingleComponent,
    QualifyAddComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    TurnoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TurnoModule { }
