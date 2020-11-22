import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    userLoggedIn = false;

    constructor(
        private authService : AuthService
    ) { }

    canActivate() {
        if (this.authService.isUserLoggedIn()) {
            return true;
            // this.router.navigate(['/patientdetails']);
        } else {
            return false;
        }
    }
}