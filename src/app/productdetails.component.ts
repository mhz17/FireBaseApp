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
import { Router, ActivatedRoute } from '@angular/router';
import { Product, MyProduct } from './models/product.model';
import { AngularFireAction } from 'angularfire2/database/interfaces';

@Component({
    selector: 'app-productdetails',
    templateUrl: './productdetails.component.html',
    styleUrls: ['./productdetails.component.css']
})
export class ProductDetailsComponent implements OnInit {

    product: Product;
    user: any;
    sub: any;
    key: string;
    items: any;

    constructor(
        private auth: AuthService,
        private db: AngularFireDatabase,
        private parameters: ActivatedRoute,
        private route: Router) {
            this.key = parameters.snapshot.params.key;
        }

        ngOnInit() {
            this.product = new Product(null, null, null, null, null);
            this.auth.getAuthState().subscribe(
                (user) => {this.user = user;
                    if (this.user != null) {

                        if (this.key !== undefined) {
                            this.loadProduct();
                        }

                    }
                }
            );
        }

        // Save Product to the db
        saveProduct() {

            if (this.key === undefined) {
                const userList = this.db.list('/product');
                userList.push(this.product);
                this.product = new Product(null, null, null, null, null);
            } else {
                const itemsRef = this.db.list('product');
                itemsRef.set(this.key, {
                    name: this.product.name,
                    fat: this.product.fat,
                    proteins: this.product.proteins,
                    carbs: this.product.carbs
                });
                this.product = new Product(null, null, null, null, null);
            }

            this.route.navigate(['home']);
        }

        // Cancel Adding new product, navigate to the home page
        cancel() {
            this.route.navigate(['home']);
        }

        // Load Product drop down list
        loadProduct() {
            this.items = this.db.list('/product', ref => ref.orderByKey().equalTo(this.key.toString()));
            this.items.valueChanges(['child_added'])
                .subscribe(actions => {
                    actions.forEach(action => {
                        this.product = action;
                    });
                });
        }
}


