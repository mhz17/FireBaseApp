import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { FormsModule } from '@angular/forms';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  showUser: boolean;
  username: string;
  user = null;
  items: Observable<any>;
  prods: AngularFireList<any>;
  products: Array<any> = [];
  showValidation: boolean;
  product: Product;

  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase) { }


    ngOnInit() {
      this.product = new Product(null, null, null, null);
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
          this.items = itemsList.valueChanges();

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

    addMore() {

      let int;
      const queryObservable = this.db.list<any>('/product', ref => ref.orderByKey().limitToLast(1)).snapshotChanges();

      queryObservable.subscribe(queriedItems => {
        int = Number(queriedItems[0].key) + 1;

        console.log('-----------------');
        console.log('id: ' + int);
        console.log('name: ' + this.product.name);
        console.log('fat: ' + this.product.fat);
        console.log('carbs: ' + this.product.carbs);
        console.log('proteins: ' + this.product.proteins);

        // const model = {'name':  this.name, 'fat': this.fat, 'carbs': this.carbs, 'proteins': this.proteins};
        // this.db.database.ref('/product').child(int.toString()).set(model);

      });

    }

    onSubmit() {
      console.log('submit: ' + this.product.fat);
      if (this.product.fat === null || this.product.proteins === null || this.product.carbs === null || this.product.name === null) {
        this.showValidation = true;
      } else {
        this.showValidation = false;
      }

    }
}
