import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabaseProvider, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuthProvider, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from '../shared/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'firebaseapp'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, AngularFireAuthProvider, AngularFireDatabaseProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
