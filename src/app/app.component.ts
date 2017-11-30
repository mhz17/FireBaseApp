import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
// import { firestore } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showUser: boolean;
  username: string;
  user = null;
  public items$: Observable<any>;
  // topics: FirebaseListObservable<any[]>;
  prods: AngularFireList<any>;

  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase) { }

    ngOnInit() {
      this.auth.getAuthState().subscribe(
        (user) => this.user = user);
        if (this.user != null) {
          this.showUser = true;
        } else {
          this.showUser = false;
        }
    }

    loginWithGoogle() {
      this.auth.loginWithGoogle().then((result) => {
        if (result) {

          this.showUser = true;
          this.username = result.user['displayName'];

          const itemsList = this.db.list<any>('/product');
          this.items$ = itemsList.valueChanges();
          this.items$.subscribe(console.log);


        } else {
          this.showUser = false;
          this.username = null;
        }
      });
    }

    logOut() {
      this.auth.logOut();
        this.showUser = false;
        this.username = null;
        this.user = null;
    }

}
