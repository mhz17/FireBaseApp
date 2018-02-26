import { Component, OnInit, NgModule, ViewContainerRef } from '@angular/core';
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
    product: Product;
    itemsRef: AngularFireList<any>;
    userid: string;

    constructor(
        private auth: AuthService,
        public db: AngularFireDatabase,
        private route: Router) {
        }


    ngOnInit() {
        console.log('home page');
        this.product = new Product(null, null, null, null, null);

        // Check if user is authorised
        this.auth.getAuthState().subscribe(
            (user) => {
            this.user = user;
            this.username = user['displayName'];
            this.userid = user['uid'];
                if (this.user != null) {
                    this.showUser = true;
                    // If user is authorised load all products
                    this.loadAllProducts();
                } else {
                    this.showUser = false;
                }
            }
        );
    }

    // Load all products
    loadAllProducts() {
        this.items = this.db.list<any>('/product').snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }

    // Delete selected product (Look for a product using product key)
    deleteProduct(key) {
        this.itemsRef = this.db.list('/product', ref => ref.orderByKey().equalTo(key));
        this.itemsRef.snapshotChanges(['child_added'])
            .subscribe(actions => {
                actions.forEach(action => {
                    this.itemsRef.remove(action.key);
                });
            });
    }

    // Edit Existing product (navigate to product details)
    editProduct(key) {
        this.route.navigate(['productdetails', key]);
    }

    // Add New product (navigate to product details)
    addProduct() {
        this.route.navigate(['productdetails']);
    }

}
