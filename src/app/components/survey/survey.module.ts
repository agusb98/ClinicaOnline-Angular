import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyAddComponent } from 'src/app/pages/survey/survey-add/survey-add.component';
import { SurveyGetComponent } from 'src/app/pages/survey/survey-get/survey-get.component';

@NgModule({
  declarations: [SurveyAddComponent, SurveyGetComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SurveyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SurveyModule { }
