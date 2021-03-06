// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, CanActivate } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG & Other Components
import { ConfirmDialogModule, ConfirmationService, DropdownModule, Calendar, CalendarModule, InputTextModule } from 'primeng/primeng';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { MyProductsComponent } from './myproducts.component';
import { ProductDetailsComponent } from './productdetails.component';

// AngularFireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabaseProvider, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuthProvider, AngularFireAuth } from 'angularfire2/auth';

// Shared
import { environment } from '../environments/environment';
import { AuthService } from './shared/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { ProductService } from './shared/product.service';
import { CanAccessGuard } from './guards/canAccess.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MyProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    AngularFireModule.initializeApp(environment.firebase, 'firebaseapp'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ConfirmDialogModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, AngularFireAuthProvider, AngularFireDatabaseProvider, CanAccessGuard, ProductService,
    ConfirmationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
