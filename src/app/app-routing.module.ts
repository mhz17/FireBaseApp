import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { MyProductsComponent } from './myproducts.component';
import { ProductDetailsComponent } from './productdetails.component';
import { CanAccessGuard } from './guards//canAccess.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [CanAccessGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'myproducts', component: MyProductsComponent, canActivate: [CanAccessGuard]},
  { path: 'productdetails', component: ProductDetailsComponent, canActivate: [CanAccessGuard]},
  { path: 'productdetails/:key', component: ProductDetailsComponent, canActivate: [CanAccessGuard]},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
