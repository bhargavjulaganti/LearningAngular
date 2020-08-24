import { Component, OnInit } from '@angular/core';
import {workouts} from '../workouts';
import { Workout } from '../Interfaces/IWorkout';
import { GetData } from '../deadlift/deadlift.response';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, concat } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-myworkout',
  templateUrl: './myworkout.component.html',
  styleUrls: ['./myworkout.component.css']
})
export class MyworkoutComponent implements OnInit {

  private static readonly hostName = "https://q6rrg5mw2k.execute-api.us-east-2.amazonaws.com/default";

  workouts = workouts;

  todaysWorkout: any;
  todaysWorkout1: any;
  finalTodaysWorkout: any; // Array<Workout>;
  showTodaysWorkout: boolean;
  
  constructor( private http: HttpClient ) { }

  ngOnInit() {
    this.getTodaysWorkout();
  }

  getTodaysWorkout() {
    var d = new Date();
    // d.setDate(d.getDate()-5); // subtract days
    this.todaysWorkout = this.http.get<GetData>(`${MyworkoutComponent.hostName}/todaysworkout?WorkoutDate=` + formatDate(d, 'MM/dd/yyyy', 'en'))
      .pipe(map(data => {
        console.log('final todays workout');
        if (data ) {
          this.finalTodaysWorkout = data;
          console.log('inside if loop');
          this.showTodaysWorkout = this.finalTodaysWorkout.length >0 ? true : false ;  
          console.log(this.showTodaysWorkout);
          console.log(this.finalTodaysWorkout.length);
        }
      })
      ).subscribe();
  }
}
