import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deadlift',
  templateUrl: './deadlift.component.html',
  styleUrls: ['./deadlift.component.css']
})
export class DeadliftComponent implements OnInit {

  private static readonly hostName = "https://q6rrg5mw2k.execute-api.us-east-2.amazonaws.com/default/";

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get<string>(`${DeadliftComponent.hostName}/getworkouthistory`)
      .pipe().subscribe( (data: string) => {
        console.log(JSON.stringify(data));
      });

  }

}
