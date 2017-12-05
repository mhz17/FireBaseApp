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
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
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
    itemsRef: AngularFireList<any>;
    userid: string;

    constructor(
        private auth: AuthService,
        public db: AngularFireDatabase,
        private route: Router) { }


    ngOnInit() {
        this.product = new Product(null, null, null, null);
        this.auth.getAuthState().subscribe(
            (user) => {
            this.user = user;
            this.username = user['displayName'];
            this.userid = user['uid'];
                if (this.user != null) {
                    this.showUser = true;
                    this.loadAllProducts();
                } else {
                    this.showUser = false;
                }
            }
        );
    }

    redirect() {
        this.route.navigate(['login']);
    }

    loadAllProducts() {
        const itemsList = this.db.list<any>('/product');
        this.items = itemsList.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
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

    // editProduct(updateproduct) {
    //     this.product = new Product(updateproduct.name, updateproduct.fat, updateproduct.proteins, updateproduct.carbs);
    // }

    editProduct(key) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                'key': key
            }
        };
        this.route.navigate(['productdetails'], navigationExtras);
    }

    addProduct() {
        this.route.navigate(['productdetails']);
    }

}
