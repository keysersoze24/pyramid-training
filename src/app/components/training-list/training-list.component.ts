import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
  }


  async startTraining() {
    this.training.updateStatus(TrainingStatusEnum.PreWorkout)
    await this.training.preWorkoutRestTime.startTimer();
    this.training.updateStatus(TrainingStatusEnum.Workout);
  }

}
