import { Component, OnInit } from '@angular/core';
import {workouts} from '../workouts';
import { Workout } from '../Interfaces/IWorkout';
import { GetData } from '../deadlift/deadlift.response';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, concat } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { GetPatientPersonalData, postbody, WeightNotes } from './GetpatientByName.response';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-myworkout',
  templateUrl: './myworkout.component.html',
  styleUrls: ['./myworkout.component.css']
})
export class MyworkoutComponent implements OnInit {

  private static readonly hostName = 'https://r4.smarthealthit.org/Patient?family=';

  workouts = workouts;

  todaysWorkout: any;
  weightDetails: any;
  weightDetailsNotes: any;
  finalTodaysWorkout: any;
  showTodaysWorkout: boolean;
  firstname: any;
  givenname: string;
  telephonenumber: string;
  showDetails: boolean;
  loadMyWorkoutComponent: boolean;
  patientID: string;
  customNotes: any[];
  mynotes: WeightNotes;
  inValidGivenName: boolean;
  showErrorMessage: boolean;

  FinalBody: postbody;
  constructor( private http: HttpClient ) { }

  EnterWorkoutForm = new FormGroup({
    Set1: new FormControl('')
  });



  EnterNotesForm = new FormGroup({
    authorString: new FormControl(''),
    text: new FormControl('')
  });

  ngOnInit() {
  }

  getPatientDetails(familyname: string) {
    let d = new Date();
    // d.setDate(d.getDate()-5); // subtract days
    // tslint:disable-next-line: max-line-length
    this.todaysWorkout = this.http.get<any>(`https://r4.smarthealthit.org/Patient?family=` + familyname)
      .pipe(map(data => {
        console.log('final todays workout');
        if (data ) {
          console.log('The data is');
          // console.log(data.entry[0].resource.name[0].given[0]);
          // console.log(data.entry[0].resource.telecom[0].value);
          if (data.entry) {
            this.givenname = data.entry[0].resource.name[0].given[0];
            this.telephonenumber = data.entry[0].resource.telecom[0].value;
            this.patientID = data.entry[0].resource.id;
            console.log('patient ID is');
            console.log(this.patientID);
            console.log('telephone number in get patientdetails');
            console.log(this.telephonenumber);
            this.getWeightDetails(this.patientID);
            this.showDetails = true;
            this.showErrorMessage = false;
          } else {
            // To show error message if the given name is not
            // found in database
            this.showErrorMessage = true;
            this.showDetails = false;
          }
        }
      })
      ).subscribe();
  }

  getWeightDetails(id: string) {

    // tslint:disable-next-line: max-line-length
    this.weightDetails = this.http.get<any>(`https://r4.smarthealthit.org/Observation?patient=` + id) //id) //'494743a2-fea5-4827-8f02-c2b91e4a4c9e'
    .pipe(map(data => {
      console.log('final todays workout');
      if (data ) {
        // console.log('get weight details');
        // console.log('length is');
        // console.log(data.entry.length);
        this.weightDetailsNotes = data.entry[0].resource.note;
        this.FinalBody = data.entry[0].resource;
        // console.log('the final body is');
        // console.log(this.FinalBody);

        // this.mynotes = {
        //   authorString: 'testing from code233',
        //   time: '2020-10-10T22:20:24.262Z',
        //   text: '67'
        // };

        // if (this.FinalBody.note) {
        //   console.log('Inside if loop');
        //   this.FinalBody.note.push(this.mynotes);
        // } else {
        //   console.log('Inside the else loop');
        //   this.FinalBody.note = [];
        //   this.FinalBody.note.push(this.mynotes);
        // }

        this.customNotes = data.entry[0].resource.note;

        // this.customNotes.push(this.mynotes);
        // console.log('My Custom Notes');


        console.log('the final body after adding new input');
        console.log(this.FinalBody);

        // tslint:disable-next-line: max-line-length
        // this.http.post<any>(`https://r4.smarthealthit.org/Observation?patient=2cda5aad-e409-4070-9a15-e1c35c46ed5a`, this.FinalBody).subscribe
        // ( data => {
        //   console.log('posted data');
        //   console.log(data);
        // });



        // console.log(data.entry[0].resource.note[0].authorString);
      }
    })
    ).subscribe();
  }

  GetPatientDetails() {
      console.log('patient details');

      let Set4 = `${this.EnterWorkoutForm.value.Set1}`;
      console.log(' set4 is ');
      console.log(Set4);
      console.log('telecom number is ');
      console.log(this.telephonenumber);
      this.getPatientDetails(Set4);
      console.log('given name is ');
      console.log(this.givenname);
      console.log('show details value is');
      console.log(this.showDetails);

  }

  GetNotesDetails() {
    console.log(' Get Notes Details');

    var d = new Date();

    this.mynotes = {
      authorString: `${this.EnterNotesForm.value.authorString}`,
      time: d.toISOString(),
      text: `${this.EnterNotesForm.value.text}`
    };

    // If the note object exists push the object
    // else empty the array and insert the object
    if (this.FinalBody.note) {
      console.log('Inside if loop');
      this.FinalBody.note.push(this.mynotes);
    } else {
      console.log('Inside the else loop');
      this.FinalBody.note = [];
      this.FinalBody.note.push(this.mynotes);
    }

    // console.log('patient id in GetNotes');
    // console.log(this.patientID);

    // console.log('Get complete notes details');
    // console.log(this.FinalBody);

    this.http.post<any>(`https://r4.smarthealthit.org/Observation?patient=` + this.patientID, this.FinalBody).subscribe
      (data => {
        console.log('posted data');
        console.log(data);
      });
  }
}
