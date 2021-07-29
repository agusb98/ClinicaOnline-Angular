import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TurnoRoutingModule } from './turno-routing.module';
import { TurnoAddComponent } from './turno-add/turno-add.component';
import { TurnoListComponent } from './turno-list/turno-list.component';
import { HttpClientModule } from '@angular/common/http';
import { IsEmptyPipe } from 'src/app/pipes/is-empty.pipe';

@NgModule({
  declarations: [TurnoAddComponent, TurnoListComponent, IsEmptyPipe],
  imports: [
    TurnoRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class TurnoModule { }
