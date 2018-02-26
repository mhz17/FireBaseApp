import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ɵROUTER_PROVIDERS, RouterLinkActive } from '@angular/router';
import { Product, MyProduct } from './models/product.model';
import { AngularFireAction } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username: string;
  user = null;
  userid: string;

  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase,
    private route: Router) { }


  ngOnInit() {
      this.auth.getAuthState().subscribe(
        (user) => {
        this.user = user;
          if (this.user != null) {
            this.username = user['displayName'];
          }
        });
  }

  // Show Banner if not on login page
  showBanner(): boolean {
    return (this.route.url !== '/login');
  }

  // Redirect to login page
  redirect() {
    this.route.navigate(['login']);
  }

  // Log out button
  logOut() {
    this.auth.logOut();
    this.username = null;
    this.user = null;
    this.redirect();
  }

}
