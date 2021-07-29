import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user$: Observable<any>;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.afAuth.user.subscribe(user => {
      if (user && user.email) {
        this.user$ = this.userService.getOne(user.email);
      }
    });
  }

}
