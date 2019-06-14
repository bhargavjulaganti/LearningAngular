import { Component } from '@angular/core';
import {products} from '../products';
import {workouts} from './workouts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  products = products;
  workouts = workouts;
}
