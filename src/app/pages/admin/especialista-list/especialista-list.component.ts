import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/models/especialista';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-especialista-list',
  templateUrl: './especialista-list.component.html',
  styleUrls: ['./especialista-list.component.css']
})
export class EspecialistaListComponent implements OnInit {

  list: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().valueChanges().subscribe((users) => {
      users.forEach(user => {
        if (user.user == 'Especialista') {
          this.list.push(user);
        }
      });
    });
  }

  setStatus(user: Especialista) {
    user.status = !user.status;

    //I dont know why but thats the way it works
    this.cleanList();
    this.userService.update(user).then(() => {
      this.cleanList();
    });
  }

  cleanList() {
    this.list.splice(0);
  }
}
