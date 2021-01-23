import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestTime } from 'src/app/models/rest-time';
import { ConfigService } from 'src/app/services/config.service';
import { TrainingService } from 'src/app/services/training.service';
import {
  RoutesPathEnum,
  TimerStatusEnum,
  TrainingStatusEnum,
} from 'src/app/shared/constants';

@Component({
  selector: 'app-training-execution',
  templateUrl: './training-execution.component.html',
  styleUrls: ['./training-execution.component.scss'],
})
export class TrainingExecutionComponent implements OnInit {
  TimerStatuEnum = TimerStatusEnum;
  TrainingStatusEnum = TrainingStatusEnum;
  currentRestTime: RestTime;

  constructor(
    public trainingService: TrainingService,
    public configService: ConfigService,
    private router: Router
  ) {}

  ngOnInit() {
    this.trainingService.getTrainingSelected().subscribe((trainingSelected) => {
      switch (trainingSelected?.status) {
        case TrainingStatusEnum.PreWorkout:
          this.currentRestTime = trainingSelected.restTime;
          break;
        case TrainingStatusEnum.Workout:

          break;
        case TrainingStatusEnum.PostWorkout:
          this.currentRestTime = trainingSelected.restTime;
          break;
        case TrainingStatusEnum.Finish:
          this.navigateHome();
          break;
        default:
          this.navigateHome();
          break;
      }
    });
  }

  navigateHome() {
    setTimeout(() => {
      this.router.navigate([RoutesPathEnum.Home]);
    }, 1000);
  }

  stopTraining() {
    const trainingSelected = this.trainingService.getTrainingSelectedSync();
    trainingSelected.restTime.pauseTimer();
  }
}
