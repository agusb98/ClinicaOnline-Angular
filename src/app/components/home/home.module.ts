import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from 'src/app/pages/home/home.component';

//Traductor
import { TranslateModule } from '@ngx-translate/core';
import { HistoryListComponent } from 'src/app/pages/history/history-list/history-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommentListComponent } from 'src/app/pages/comment/comment-list/comment-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    HistoryListComponent,
    CommentListComponent,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
  ]
})
export class HomeModule { }
