import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { QualifyRoutingModule } from './qualify-routing.module';
import { QualifyAddComponent } from 'src/app/pages/qualify/qualify-add/qualify-add.component';
import { QualifyGetComponent } from 'src/app/pages/qualify/qualify-get/qualify-get.component';

@NgModule({
  declarations: [QualifyAddComponent, QualifyGetComponent],
  imports: [
    CommonModule,
    BrowserModule,
    QualifyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class QualifyModule { }
