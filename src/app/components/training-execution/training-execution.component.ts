import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { TrainingService } from 'src/app/services/training.service';
import { RoutesPathEnum, TimerStatusEnum, TrainingStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-training-execution',
  templateUrl: './training-execution.component.html',
  styleUrls: ['./training-execution.component.scss']
})
export class TrainingExecutionComponent implements OnInit {

  TimerStatuEnum = TimerStatusEnum;
  TrainingStatusEnum = TrainingStatusEnum;

  constructor(public trainingService: TrainingService, public configService: ConfigService, private router: Router) { }

  ngOnInit() {
    this.trainingService.getTrainingSelected().subscribe(trainingSelected => {
      if (trainingSelected?.status == TrainingStatusEnum.Finish || !trainingSelected?.status) {
        setTimeout(() => {
          this.router.navigate([RoutesPathEnum.Home])
        }, 1000)
      }
    })
  }

  stopTraining() {
    const trainingSelected = this.trainingService.getTrainingSelectedSync();
    trainingSelected.restTime.pauseTimer();
  }

}
