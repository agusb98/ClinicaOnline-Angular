import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClininaOnline';
  @Output() user: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void{
    this.getUser();
  }

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
