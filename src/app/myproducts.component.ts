import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireModule } from 'angularfire2';
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
    selector: 'app-myproducts',
    templateUrl: './myproducts.component.html',
    styleUrls: ['./myproducts.component.css']
})
export class MyProductsComponent implements OnInit {

    product: Product;
    myproduct: MyProduct;
    user: any;
    userid: any;
    myitems: Observable<any>;

    constructor(
        private auth: AuthService,
        public db: AngularFireDatabase,
        private route: Router) { }


        ngOnInit() {
            this.product = new Product(null, null, null, null);
            this.myproduct = new MyProduct(null, null, null, null, null, null, null);
            this.auth.getAuthState().subscribe(
                (user) => {this.user = user;
                    if (this.user != null) {
                        this.userid = user['uid'];
                        this.loadMyProducts();
                    }
                }
            );
        }

        loadMyProducts() {
            const itemsList = this.db.list<any>('/userproducts/' + this.userid);
            this.myitems = itemsList.snapshotChanges().map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
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


}


