import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../guards/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private authService: AuthService;

  EnterCredentials = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  })

  private showAlert : boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ValidateCredentials() {
    console.log(this.EnterCredentials.value.Username);
    console.log(this.EnterCredentials.value.Password);
    if (this.EnterCredentials.value.Username == 'test' && this.EnterCredentials.value.Password == 'test') {
      localStorage.setItem('localStorageLoggedIn', 'true');
    } else {
      this.showAlert=true;
    }

  }

}
