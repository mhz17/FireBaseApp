import { Component, OnInit, NgModule, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ɵROUTER_PROVIDERS } from '@angular/router';
import { Product, MyProduct } from './models/product.model';
import { AngularFireAction } from 'angularfire2/database/interfaces';
import { DropdownModule, SelectItem, Calendar, CalendarModule, InputText, InputTextModule } from 'primeng/primeng';
import * as moment from 'moment';

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
    items: Observable<any>;
    myitems: Observable<any>;
    addProduct: boolean;
    listOfProducts: any;
    selectedProduct: any;

    constructor(
        private auth: AuthService,
        public db: AngularFireDatabase,
        private route: Router,
        private datePipe: DatePipe) { }


    ngOnInit() {
        this.selectedProduct = null;
        this.addProduct = false;
        this.product = new Product(null, null, null, null);
        this.myproduct = new MyProduct(null, null, null, null, null, null, null);
        this.auth.getAuthState().subscribe(
            (user) => {
            this.user = user;
                if (this.user != null) {
                    this.userid = user['uid'];
                    this.loadMyProducts();
                    this.loadAllProducts().subscribe(i => this.listOfProducts = i);

                }
            }
        );
    }

    loadAllProducts(): Observable<any> {
        return this.items = this.db.list<any>('/product').snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }

    loadMyProducts() {
        this.myitems = this.db.list<any>('/userproducts/' + this.userid).snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }

    addProductToMyList() {
        const dt = moment(this.myproduct.date).format('DD/MM/YYYY');
        this.myproduct.key = this.selectedProduct.key;
        this.myproduct.fat = this.selectedProduct.fat;
        this.myproduct.proteins = this.selectedProduct.proteins;
        this.myproduct.carbs = this.selectedProduct.carbs;
        this.myproduct.name = this.selectedProduct.name;
        this.myproduct.date = dt;
        const itemsRef = this.db.list('userproducts/' + this.userid);
        itemsRef.push(this.myproduct);
        this.myproduct = new MyProduct(null, null, null, null, null, null, null);
        this.addProduct = false;
    }

    cancel() {
        this.addProduct = false;
    }

    showAddProduct() {
        this.addProduct = true;
    }

}


