import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyworkoutComponent } from './myworkout/myworkout.component';
import { RouterModule } from '@angular/router';
import { DeadliftComponent } from './deadlift/deadlift.component';
import { BenchpressComponent } from './benchpress/benchpress.component';
import { SquatComponent } from './squat/squat.component';
import { HttpClientModule} from '@angular/common/http';

// Third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MyworkoutComponent,
    DeadliftComponent,
    BenchpressComponent,
    SquatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent},
      { path: 'patientdetails', component: MyworkoutComponent},
      { path: 'logworkout', component: DeadliftComponent},
      { path: 'benchpress', component: BenchpressComponent},
      { path: 'squats', component: SquatComponent}
  ]),
  NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
