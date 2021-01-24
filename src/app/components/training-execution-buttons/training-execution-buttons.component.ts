import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { TrainingStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-training-execution-buttons',
  templateUrl: './training-execution-buttons.component.html',
  styleUrls: ['./training-execution-buttons.component.scss']
})
export class TrainingExecutionButtonsComponent implements OnInit {

  TrainingStatusEnum = TrainingStatusEnum;

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
  }

  pauseTraining() {
    const trainingSelected = this.trainingService.getTrainingSelectedSync();
    trainingSelected.restTime.pauseTimer();
  }

  resumeTraining() {
    const trainingSelected = this.trainingService.getTrainingSelectedSync();
    trainingSelected.restTime.resumeTimer();
  }

}
