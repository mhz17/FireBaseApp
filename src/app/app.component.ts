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
  itemsRef: AngularFireList<any>;

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

  addProduct() {
    // const queryObservable = this.db.list<any>('/product', ref => ref.orderByKey().limitToLast(1)).snapshotChanges();

    // queryObservable.subscribe(queriedItems => {
    //   int = Number(queriedItems[0].key) + 1;
    //   console.log(queriedItems);
    //   console.log('Testing....');
    //   // const model = {'name':  this.product.name, 'fat': this.product.fat, 'carbs':
    //   // this.product.carbs, 'proteins': this.product.proteins};
    //   // console.log('model: ' + JSON.stringify(model));
    //   // this.db.database.ref('/product').child(int.toString()).set(model);
    // });
    const int = this.getMaxID();

  //   const userList = this.db.list('/product');
  //   userList.set(int.toString(),
  //     {
  //       name: this.product.name,
  //       fat: this.product.fat,
  //       proteins: this.product.proteins,
  //       carbs: this.product.carbs
  //     });
  }

  getMaxID(): number {
    this.itemsRef = this.db.list('/product', ref => ref.orderByKey().limitToLast(1));

    this.itemsRef.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        console.log('key');
        console.log(action.key);
        return Number(action.key) + 1;
      });
    });

    return null;
  }

  deleteProduct() {

    this.itemsRef = this.db.list('/product', ref => ref.orderByKey().startAt('4'));
    this.itemsRef.snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
          this.itemsRef.remove(action.key);
        });
      });
  }
}
