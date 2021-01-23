import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { TrainingService } from 'src/app/services/training.service';
import { TimerStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-training-execution',
  templateUrl: './training-execution.component.html',
  styleUrls: ['./training-execution.component.scss']
})
export class TrainingExecutionComponent {

  TimerStatuEnum = TimerStatusEnum;

  constructor(public trainingService: TrainingService, public configService: ConfigService) { }

}
