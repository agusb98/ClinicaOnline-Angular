import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserListComponent } from 'src/app/pages/admin/user-list/user-list.component';
import { EspecialistaListComponent } from 'src/app/pages/admin/especialista-list/especialista-list.component';

@NgModule({
  declarations: [
    UserListComponent, 
    EspecialistaListComponent, 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
