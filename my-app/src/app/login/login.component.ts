import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../guards/auth.service';
import { GetLoginResponse } from './login.response';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private authService: AuthService;

  private static readonly hostName = "https://q6rrg5mw2k.execute-api.us-east-2.amazonaws.com/default";
  
  userNameDetails: any;
  isLoggedIn: boolean;

  EnterCredentials = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  })

  private showAlert : boolean;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if ( (localStorage.getItem('adminStorageLoggedIn') == 'true') 
        || (localStorage.getItem('localStorageLoggedIn') == 'true')) {
          this.isLoggedIn = true;
    }
  }

  ValidateCredentials() {
    this.userNameDetails = this.http.get<GetLoginResponse>(`https://q6rrg5mw2k.execute-api.us-east-2.amazonaws.com/default/getcredentials?userId=`+this.EnterCredentials.value.Username)
    .pipe(map(data => {
      if (data) {
        this.userNameDetails = data;
        console.log('inside validate credentials **** START');
        console.log(this.userNameDetails);
        console.log('inside validate credentials **** END');

        console.log(this.EnterCredentials.value.Username);
        console.log(this.EnterCredentials.value.Password);
        if (this.EnterCredentials.value.Username == this.userNameDetails.UserId 
            && this.EnterCredentials.value.Password == this.userNameDetails.Password 
            && this.userNameDetails.Role !== 'admin') {
          console.log(' inside if loop login componenet');    
          localStorage.setItem('localStorageLoggedIn', 'true');
          this.router.navigate(['/logworkout']);
        } else if (this.EnterCredentials.value.Username == this.userNameDetails.UserId
                   && this.EnterCredentials.value.Password == this.userNameDetails.Password ){
          localStorage.setItem('adminStorageLoggedIn', 'true');
          this.router.navigate(['/patientdetails']);
        }else {
          this.showAlert=true;
        }

      }
    })).subscribe();



  }

}
