import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestTime } from 'src/app/models/rest-time';
import { Training } from 'src/app/models/training';
import { Workout } from 'src/app/models/workout';
import { RoutesPathEnum, TrainingStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  training = new Training();
  TrainingStatusEnum = TrainingStatusEnum;

  constructor(private router: Router) { }

  ngOnInit(): void {  }

  scrollWorkout() {
    this.training.workout.scroll()
  }

  generateTraining() {
    this.router.navigate([RoutesPathEnum.TrainingCard]);
  }

}
