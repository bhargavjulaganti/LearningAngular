import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { GetData } from './deadlift.response';

@Component({
  selector: 'app-deadlift',
  templateUrl: './deadlift.component.html',
  styleUrls: ['./deadlift.component.css']
})
export class DeadliftComponent implements OnInit {

  private static readonly hostName = "https://q6rrg5mw2k.execute-api.us-east-2.amazonaws.com/default/";


  deadliftHistory: any;
  mydata: GetData;
  Count: number;
  Items: Array<any>;
  constructor(private http: HttpClient) { }

  // ngOnInit() {

  //   this.deadliftHistory = this.http.get<string>(`${DeadliftComponent.hostName}/getworkouthistory`)
  //     .pipe().subscribe((data: any) => {
  //       console.log(data.Count);
  //       console.log(JSON.stringify(data));
  //     });
  // }


  ngOnInit() {

    this.deadliftHistory = this.http.get<GetData>(`${DeadliftComponent.hostName}/getworkouthistory`)
      .pipe(map(data => {
        if(data){
          this.deadliftHistory = JSON.stringify(data);
          this.Count = data.Count;
          this.Items = data.Items;
          console.log(this.Count);
          console.log(this.Items[0].CreatedDate);
          console.log(this.Items[0].Set1);
          console.log(this.Items[1].CreatedDate);
        }
      })).subscribe();
  }
}
