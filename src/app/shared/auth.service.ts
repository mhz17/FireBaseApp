import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Session } from 'protractor';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState() {
    return this.authState;
  }

  loginWithGoogle(): any {
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function(){
      return this.afAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider());
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

}
