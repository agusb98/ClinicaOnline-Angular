import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    }
    catch (error) { }
  }
}
