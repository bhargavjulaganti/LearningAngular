import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyworkoutComponent } from './myworkout/myworkout.component';
import { RouterModule } from '@angular/router';
import { DeadliftComponent } from './deadlift/deadlift.component';
import { BenchpressComponent } from './benchpress/benchpress.component';
import { SquatComponent } from './squat/squat.component';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MyworkoutComponent,
    DeadliftComponent,
    BenchpressComponent,
    SquatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component:MyworkoutComponent},
      { path: 'deadlift', component:DeadliftComponent},
      { path: 'benchpress', component:BenchpressComponent},
      { path: 'squats', component:SquatComponent}
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
