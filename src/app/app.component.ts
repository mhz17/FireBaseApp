import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showUser: boolean;
  username: string;
  user = null;

  // topics: FirebaseListObservable<any[]>;

  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase) { }

    ngOnInit() {
      this.auth.getAuthState().subscribe(
        (user) => this.user = user);

        if (this.user != null) {

          this.showUser = true;
          this.db.database.ref('product').once('value', function(snap) {
            console.log('data is returned');
          }, function(err) {
            console.log('error: ' + err);
          });
        }
        // this.db.list('product').snapshotChanges().map(actions => {
        //   return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        // }).subscribe(items => {
        //   items.map(item => item.key);
        //   console.log('items: ' +  JSON.stringify(items));
        // });
    }

    loginWithGoogle() {
      this.auth.loginWithGoogle().then((result) => {
        if (result) {
          console.log('user: ' + result.user['displayName']);
          this.showUser = true;
          this.username = result.user['displayName'];
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
    }

}
