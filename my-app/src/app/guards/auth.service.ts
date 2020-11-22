import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor() {}

    isUserLoggedIn() {
        console.log('local storage value');
        console.log(localStorage.getItem('localStorageLoggedIn'));
        // Currently we are setting the local storage value in Login Component 
        // once username and password matches
        // While clicking routes , we check local storage value to activate route
        // If client clicks logout we are clearing local storage
        // Future implementation we can use API Service
        if(localStorage.getItem('localStorageLoggedIn') == 'true') {
            console.log('auth service if');
            return true;
        }
        
        return false;
    }
}