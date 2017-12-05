import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ɵROUTER_PROVIDERS } from '@angular/router';
import { Product, MyProduct } from './models/product.model';
import { AngularFireAction } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  showUser: boolean;
  username: string;
  user = null;
  items: Observable<any>;
  myitems: Observable<any>;
  product: Product;
  myproduct: MyProduct;
  itemsRef: AngularFireList<any>;
  userid: string;

  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase,
    private route: Router) { }


  ngOnInit() {
    this.product = new Product(null, null, null, null);
    this.myproduct = new MyProduct(null, null, null, null, null, null, null);
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
        this.userid = result.user['uid'];
        this.loadAllProducts();
        this.loadMyProducts();

      } else {
        this.showUser = false;
        this.username = null;
      }
    });
  }

  redirect() {
   console.log(this.route);
    this.route.navigate(['login']);
  }

  loadAllProducts() {
    const itemsList = this.db.list<any>('/product');
    this.items = itemsList.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  loadMyProducts() {
    const itemsList = this.db.list<any>('/userproducts/' + this.userid);
    this.myitems = itemsList.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }


  logOut() {
    this.auth.logOut();
    this.showUser = false;
    this.username = null;
    this.user = null;
  }

  addProduct() {
    const userList = this.db.list('/product');
    userList.push(this.product);
    this.product = new Product(null, null, null, null);
  }

  deleteProduct(key) {
    this.itemsRef = this.db.list('/product', ref => ref.orderByKey().equalTo(key));
    this.itemsRef.snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
          this.itemsRef.remove(action.key);
        });
      });
  }

  addProductToMyList() {

    const prod = this.myproduct.name;
    this.myproduct.key = prod['key'];
    this.myproduct.fat = prod['fat'];
    this.myproduct.proteins = prod['proteins'];
    this.myproduct.carbs = prod['carbs'];
    this.myproduct.name = prod['name'];

    const itemsRef = this.db.list('userproducts/' + this.userid);
    itemsRef.push(this.myproduct);
    this.myproduct = new MyProduct(null, null, null, null, null, null, null);

  }

  editProduct(updateproduct) {
    this.product = new Product(updateproduct.name, updateproduct.fat, updateproduct.proteins, updateproduct.carbs);
  }

  saveProduct(updateproduct) {
    const itemsRef = this.db.list('product');
    itemsRef.set(updateproduct.key, { name: this.product.name,
      fat: this.product.fat,
      proteins: this.product.proteins,
      carbs: this.product.carbs });
      this.product = new Product(null, null, null, null);
  }

}