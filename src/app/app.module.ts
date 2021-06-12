import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


//Toastr notification
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MisTurnosComponent } from './components/turno/mis-turnos/mis-turnos.component';
import { CommonModule } from '@angular/common';
import { UserModule } from './components/user/user.module';
import { EspecialistaListComponent } from './components/admin/especialista-list/especialista-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent, 
    UserRegisterComponent, 
    NavbarComponent, MisTurnosComponent, EspecialistaListComponent
  ],
  imports: [
    UserModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
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
