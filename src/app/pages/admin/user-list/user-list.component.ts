import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialista } from 'src/app/models/especialista';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  list$: Observable<any> = null;
  list: any[] = [];

  kyndUser: 'PACIENTE' | 'ESPECIALISTA' | 'ADMINISTRADOR' = 'PACIENTE';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(kynd: 'PACIENTE' | 'ESPECIALISTA' | 'ADMINISTRADOR' = 'PACIENTE'){
    this.kyndUser = kynd;

    this.list$ = this.userService.getByProfile(this.kyndUser);
    this.list$.subscribe(data => this.list = data);
  }

  async setStatus(user: Especialista) {
    user.status = !user.status;

    //I dont know why but thats the way it works
    this.cleanList();
    await this.userService.update(user).then(() => {
      this.cleanList();
    });
  }

  cleanList() {
    this.list$ = null;
    this.list = [];
  }
}
