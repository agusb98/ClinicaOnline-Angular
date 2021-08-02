import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserListComponent } from 'src/app/pages/admin/user-list/user-list.component';
import { UserModule } from '../user/user.module';
import { ReportsComponent } from 'src/app/pages/reports/reports.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    NgxChartsModule,
    BrowserAnimationsModule
  ],
})
export class AdminModule { }
