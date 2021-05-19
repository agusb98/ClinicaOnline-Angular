import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: Paciente = new Paciente;
  constructor(private pacienteService: PacienteService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user.email = this.authService.email;
  }

}
