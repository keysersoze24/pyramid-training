import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { TimerModesEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-training-execution',
  templateUrl: './training-execution.component.html',
  styleUrls: ['./training-execution.component.scss']
})
export class TrainingExecutionComponent implements OnInit {

  TimerModesEnum = TimerModesEnum;

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
  }

}
