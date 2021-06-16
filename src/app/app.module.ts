import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Toastr notification
import { ToastrModule } from 'ngx-toastr';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AdminModule } from './components/admin/admin.module';
import { TurnoModule } from './components/turno/turno.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    TurnoModule,  //DEBE IRSE
    AdminModule,  //DEBE IRSE
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',  //Set position
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
