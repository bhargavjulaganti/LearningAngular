import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    userLoggedIn = false;

    constructor(
        private router: Router,
    ) { }

    canActivate() {
        if (this.userLoggedIn) {
            return true;
        } else {
            return false;
        }
    }
}