import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listEspecialistas: any[] = [];
  listAdmins: any[] = [];
  listPacientes: any[] = [];

  onlyPaciente: boolean = true;
  onlyAdmin: boolean = false;
  onlyEspecialista: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  showPacientes(){
    this.onlyPaciente = true;
    this.onlyAdmin = false;
    this.onlyEspecialista = false;
  }

  showEspecialista(){
    this.onlyEspecialista = true;
    this.onlyPaciente = false;
    this.onlyAdmin = false;
  }

  showAdministradores(){
    this.onlyAdmin = true;
    this.onlyPaciente = false;
    this.onlyEspecialista = false;
  }

  getUsers() {
    this.userService.getAll().valueChanges().subscribe((users) => {
      users.forEach(user => {
        if(user.user == 'Administrador'){
          this.listAdmins.push(user);
        }
        else if(user.user == 'Especialista'){
          this.listEspecialistas.push(user);
        }
        else if(user.user == 'Paciente'){
          this.listPacientes.push(user);
        }
      });
    });
  }
}
