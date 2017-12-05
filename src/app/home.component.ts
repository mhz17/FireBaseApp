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
import { Router, ActivatedRoute, ɵROUTER_PROVIDERS } from '@angular/router';
import { Product, MyProduct } from './models/product.model';
import { AngularFireAction } from 'angularfire2/database/interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    visibility: boolean;
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
        this.visibility = false;
        this.product = new Product(null, null, null, null);
        this.auth.getAuthState().subscribe(
            (user) => {
            this.user = user;
            this.username = user['displayName'];
            this.userid = user['uid'];
            console.log(this.user);
                if (this.user != null) {
                    this.showUser = true;
                    this.loadAllProducts();
                } else {
                    this.showUser = false;
                }
            }
        );
    }

    showDiv() {
        this.visibility = !this.visibility;
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

    saveProduct() {
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

    editProduct(updateproduct) {
        this.product = new Product(updateproduct.name, updateproduct.fat, updateproduct.proteins, updateproduct.carbs);
    }

    updateProduct(updateproduct) {
        const itemsRef = this.db.list('product');
        itemsRef.set(updateproduct.key, {
            name: this.product.name,
            fat: this.product.fat,
            proteins: this.product.proteins,
            carbs: this.product.carbs
        });
        this.product = new Product(null, null, null, null);
    }

}
