import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { GetData } from './deadlift.response';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-deadlift',
  templateUrl: './deadlift.component.html',
  styleUrls: ['./deadlift.component.css']
})
export class DeadliftComponent implements OnInit {

  private static readonly hostName = "https://q6rrg5mw2k.execute-api.us-east-2.amazonaws.com/default/";


  public loanQuickSearchForm: FormGroup;

  deadliftHistory: any;
  mydata: GetData;
  Count: number;
  Items: any;
  responseData: any;
  Workouts: Array<string>;
  ChestWorkout: Array<string>;
  MyWorkout: Map<string, string[]>;
  ShowData: boolean;
  selectedWorkoutValue: any;
  selectedExcerciseValue: any;


  private map = new Map<string, string[]>([
    // tslint:disable-next-line: max-line-length
    ['Chest', ['DumbbellPullOver', 'DumbbellDeclineBenchPress', 'BarbellBenchPress', 'PecDeckFly', 'DumbbellBenchPress', 'DumbbellInclineBenchPress']],
    ['Back', ['New York', 'Austin']],
    ['Shoulders', ['']],
    ['Abs', ['BentKneeHipRaise', 'HandOver-HeadCrunch', 'ElbowToKneeSitUps', 'HangingLegRaises', 'BasicCrunches', 'MedicineBallCrunches']],
    ['Biceps', ['']],
    ['Triceps', ['']],
    ['Calves', ['']],
  ]);

  country: string;
  city: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.deadliftHistory = this.http.get<GetData>(`${DeadliftComponent.hostName}/getworkouthistory?TableName=Chest&WorkOutType=BarbellBenchPress`)
      .pipe(map(data => {
        if (data) {
          this.Items = data;
        }
      })).subscribe();
  }

  get countries(): string[] {
    return Array.from(this.map.keys());
  }

  get cities(): string[] | undefined {
    return this.map.get(this.country);
  }

  selectedWorkoutType(event: any) {
    this.selectedWorkoutValue = event.target.value;
  }

  selectedExcerciseType(event: any) {
    this.selectedExcerciseValue = event.target.value;
    this.selectedExercise();
    this.PostWorkout();
  }

  selectedExercise() {
    // tslint:disable-next-line: max-line-length
    this.deadliftHistory = this.http.get<GetData>(`${DeadliftComponent.hostName}/getworkouthistory?TableName=` + this.selectedWorkoutValue + `&WorkOutType=` + this.selectedExcerciseValue)
      .pipe(map(data => {
        if (data) {
          this.Items = data;

          this.ShowData = true;
        }
      })).subscribe();
  }

  PostWorkout() {

    var postBody =
    {
      "TableName": this.selectedWorkoutValue,
      "CreatedDate": "12/2/22",
      "WorkOutType": this.selectedExcerciseValue,
      "Notes": "From Post man",
      "Set1": "TestSet1",
      "Set2": "TestSet2",
      "Set3": "TestSet3",
      "Set4": "TestSet4"
    };

    const url = `${DeadliftComponent.hostName}/PostDataIntoDynamo`;

    this.http.post<any>(url, postBody).subscribe
      (data => {
        console.log("the post data is" + data);
      });
  }
}
