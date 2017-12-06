import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
    CanActivate, CanLoad, Router, Route } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class CanAccessGuard implements CanActivate {

    constructor(private authservice: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    canLoad(route: Route): boolean {
        return this.checkLoggedIn(route.path);
    }

    checkLoggedIn(url: string): boolean {
        console.log('authorisation');
        if (this.authservice.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
