import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { GetData } from './deadlift.response';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-deadlift',
  templateUrl: './deadlift.component.html',
  styleUrls: ['./deadlift.component.css']
})
export class DeadliftComponent implements OnInit {

  private static readonly hostName = "https://q6rrg5mw2k.execute-api.us-east-2.amazonaws.com/default";


  //loginForm: FormGroup;

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
  successMessage:string;
  showAlert: boolean;

  private map = new Map<string, string[]>([
    // tslint:disable-next-line: max-line-length
    ['Chest', ['DumbbellPullOver', 'DumbbellDeclineBenchPress', 'BarbellBenchPress', 'PecDeckFly', 'DumbbellBenchPress', 'DumbbellInclineBenchPress', 'DumbbellFlys']],
    ['Back', ['SeatedCableRowsWideGrip', 'OneArmDumbbellRow', 'CloseGripFrontLatPulldown', 'StraightArmPulldown']],
    ['Shoulders', ['FrontDeltRaise','MachineShoulderPress','BarbellShoulderPress','FrontPlateRaise']],
    ['Abs', ['BentKneeHipRaise', 'HandOver-HeadCrunch', 'ElbowToKneeSitUps', 'HangingLegRaises', 'BasicCrunches', 'MedicineBallCrunches', 'SeatedLegTucks']],
    ['Biceps', ['CloseGripEZBarCurl', 'CableBicepCurls', 'CableHammerCurls']],
    ['Triceps', ['SkullCrusherEZBar','SeatedDumbbellTricepsExtension','OverheadTricepsExtension']],
    ['Legs', ['BarbellSquats','LegPress','LegExtensions','GoodMornings','DumbbellStiffLegDeadlift','DumbbellSquats','SeatedCalfRaise']]
  ]);

  country: string;
  city: string;

  loginForm = new FormGroup({
    TextID: new FormControl('')
  });

  EnterWorkoutForm = new FormGroup({
    Set1: new FormControl(''),
    Reps1: new FormControl(''),
    Set2: new FormControl(''),
    Reps2: new FormControl(''),
    Set3: new FormControl(''),
    Reps3: new FormControl(''),
    Set4: new FormControl(''),
    Reps4: new FormControl(''),
    Notes: new FormControl('')
  });

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
    console.log("************");
    console.log(this.loginForm.value.TextID);
  }

  selectedExcerciseType(event: any) {
    this.selectedExcerciseValue = event.target.value;
    this.selectedExercise();
    //this.PostWorkout();
  }

  selectedExercise() {
    // tslint:disable-next-line: max-line-length
    this.deadliftHistory = this.http.get<GetData>(`${DeadliftComponent.hostName}/getworkouthistory?TableName=` + this.selectedWorkoutValue + `&WorkOutType=` + this.selectedExcerciseValue)
      .pipe(map(data => {
        if (data) {
          this.Items = data;
          this.ShowData = true; // show workout details only when a drop down is selected
        }
      })).subscribe();
  }


  // Adding workout to the dynamo db
  PostWorkout() {

    var postBody =
    {
      "TableName": this.selectedWorkoutValue,
      "CreatedDate": formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      "WorkOutType": this.selectedExcerciseValue,
      "Notes": this.EnterWorkoutForm.value.Notes,
      "Set1": `${this.EnterWorkoutForm.value.Set1}` + `*` + this.EnterWorkoutForm.value.Reps1,
      "Set2": `${this.EnterWorkoutForm.value.Set2}` + `*` + this.EnterWorkoutForm.value.Reps2,
      "Set3": `${this.EnterWorkoutForm.value.Set3}` + `*` + this.EnterWorkoutForm.value.Reps3,
      "Set4": `${this.EnterWorkoutForm.value.Set4}` + `*` + this.EnterWorkoutForm.value.Reps4
    };

    const url = `${DeadliftComponent.hostName}/PostDataIntoDynamo`;

    this.http.post<any>(url, postBody).subscribe
      (data => {
        console.log("The success message value before post+" + this.successMessage);
        console.log("the post data is" + data);
        this.successMessage = data;
        this.showAlert = true;
        console.log('resetting the form');
        this.EnterWorkoutForm.reset(); // This to reset the form after submit
        this.ngOnInit(); // This is to refresh form after submitting a workout
      });
  }


  // This function will close the success alert once we click on close button
  close() {
    console.log(' this is close function');
    this.showAlert = false;
  }

  // https://stackoverflow.com/questions/51435333/reset-form-in-angular-5-after-submit
  // onsubmit() {
  //   console.log('this is the submit form');
  //   this.EnterWorkoutForm.reset();
  // }
}


