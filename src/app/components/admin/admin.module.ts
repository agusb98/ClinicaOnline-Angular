import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserListComponent } from 'src/app/pages/admin/user-list/user-list.component';
import { UserModule } from '../user/user.module';
import { ReportsComponent } from 'src/app/pages/reports/reports.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    UserListComponent,
    ReportsComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    HttpClientModule,
  ],
})
export class AdminModule { }
