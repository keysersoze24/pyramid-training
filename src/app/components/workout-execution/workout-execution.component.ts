import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-workout-execution',
  templateUrl: './workout-execution.component.html',
  styleUrls: ['./workout-execution.component.scss']
})
export class WorkoutExecutionComponent implements OnInit {

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
  }

}
