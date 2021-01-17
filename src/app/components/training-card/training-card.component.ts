import { Component, OnInit } from '@angular/core';
import { RestTime } from 'src/app/models/rest-time';
import { Training } from 'src/app/models/training';
import { Workout } from 'src/app/models/workout';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent implements OnInit {
  training = new Training();

  constructor() { }

  ngOnInit(): void {
  }

  generateTraining() {
    this.training.name = "Flessioni";
    this.training.preWorkoutRestTime = new RestTime(10);
    const workoutRestTime = new RestTime(5);
    const doublePyramidRestTime = new RestTime(3);
    const doublePyramidReps = 8;
    this.training.workout = new Workout({ basePyramid: 5, apexPyramid: 1, reverse: true }, doublePyramidReps, workoutRestTime, doublePyramidRestTime);
    this.training.postWorkoutRestTime = new RestTime(20);
  }

}
