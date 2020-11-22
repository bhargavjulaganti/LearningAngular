import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    adminLoggedIn = false;

    constructor(
        private authService : AuthService
    ) { }

    canActivate() {
        if (this.authService.isAdminLoggedIn()) {
            return true;
            // this.router.navigate(['/patientdetails']);
        } else {
            return false;
        }
    }
}