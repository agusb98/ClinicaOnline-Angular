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
    this.CargarUsuario();
  }

  ngOnInit(): void { }

  private CargarUsuario() {
    this.userService.getAll().valueChanges().subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].email == 'agusszurdob@gmail.com') {
          this.user = data[i];
          break;
        }
      }
    });


  }
}
