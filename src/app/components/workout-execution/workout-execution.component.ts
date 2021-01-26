import { Component, Input, OnInit } from '@angular/core';
import { Training } from 'src/app/models/training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-workout-execution',
  templateUrl: './workout-execution.component.html',
  styleUrls: ['./workout-execution.component.scss']
})
export class WorkoutExecutionComponent implements OnInit {

  @Input() training: Training;

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
  }

}
