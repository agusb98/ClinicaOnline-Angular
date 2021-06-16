import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TurnoRoutingModule } from './turno-routing.module';
import { TurnoListComponent } from 'src/app/pages/turno/turno-list/turno-list.component';
import { TurnoAddComponent } from 'src/app/pages/turno/turno-add/turno-add.component';

@NgModule({
  declarations: [TurnoListComponent, TurnoAddComponent],
  imports: [
    CommonModule,
    BrowserModule,
    TurnoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TurnoModule { }
