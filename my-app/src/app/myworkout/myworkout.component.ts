import { Component, OnInit } from '@angular/core';
import {workouts} from '../workouts';

@Component({
  selector: 'app-myworkout',
  templateUrl: './myworkout.component.html',
  styleUrls: ['./myworkout.component.css']
})
export class MyworkoutComponent implements OnInit {
  workouts = workouts;
  constructor() { }

  ngOnInit() {
  }

}
