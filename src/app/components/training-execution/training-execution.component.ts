import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { TrainingService } from 'src/app/services/training.service';
import { TrainingStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-training-execution',
  templateUrl: './training-execution.component.html',
  styleUrls: ['./training-execution.component.scss']
})
export class TrainingExecutionComponent {

  TrainingStatusEnum = TrainingStatusEnum;

  constructor(public trainingService: TrainingService, public configService: ConfigService) { }

}
