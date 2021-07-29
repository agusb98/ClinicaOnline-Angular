import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { slideInAnimation } from './app-routing.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'ClinicaOnline';
  user$: Observable<any> = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.configTranslate();
  }

  configTranslate() {
    let len = localStorage.getItem('language');
    if (len) { this.translate.use(len); }
  }

  getUser() {
    this.authService.afAuth.user.subscribe(data => {
      if (data && data.email != null) {
        this.user$ = this.userService.getOne(data.email);
      }
    });
  }
}
