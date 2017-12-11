import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: any;
    userid: string;

    constructor(private route: Router,
        private auth: AuthService) { }

    ngOnInit() {
        this.auth.getAuthState().subscribe(
            (user) => this.username = user);
          if (this.username != null) {
            this.route.navigate(['home']);
          } else {

          }
    }

    // Login with Google
    loginWithGoogle() {
      this.auth.loginWithGoogle().then((result) => {
        if (result) {
          this.route.navigate(['home']);
        } else {

        }
      });
    }

}

