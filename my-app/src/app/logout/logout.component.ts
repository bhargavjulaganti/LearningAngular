import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private checkedLoggedIn : boolean;

  constructor(private router: Router) { }

  ngOnInit() {

    if(localStorage.getItem('localStorageLoggedIn') == 'true' 
       ||localStorage.getItem('adminStorageLoggedIn') == 'true') {
      console.log('auth service if');
      localStorage.clear();
      this.checkedLoggedIn = true;
    } else {
      this.router.navigate(['/']);
    }
    
    console.log('always executes log out');

  }

}
