import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { Especialista } from 'src/app/models/especialista';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user$: any;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getAll().valueChanges().subscribe((users) => {
      this.authService.afAuth.user.subscribe(data => {
        try {
          users.forEach(element => {
            if (data.email == element.email) {
              this.user$ = element;
            }
          });
        } catch (error) { }
      });
    });
  }
}
