import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public user: any;
  constructor(private authService: AuthService, private userService: UserService) { 
    this.getUser();
  }

  ngOnInit(): void { }

  getUser() {
    this.userService.getAll().valueChanges().subscribe((users) => {
      this.authService.afAuth.user.subscribe(data => {
        try {
          users.forEach(element => {
            if (data.email == element.email) {
              this.user = element;
            }
          });
        } catch (error) { }
      });
    });
  }
}
