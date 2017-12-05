import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Injectable()
export class CanAccessGuard implements CanActivate {

    constructor(private service: ProductService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    canLoad(route: Route): boolean {
        return this.checkLoggedIn(route.path);
    }

    checkLoggedIn(url: string): boolean {
        if (this.service.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}