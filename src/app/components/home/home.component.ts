import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from 'src/app/services/timer.service';
import { TrainingService } from 'src/app/services/training.service';
import { RoutesPathEnum, TrainingStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  TrainingStatusEnum = TrainingStatusEnum;

  constructor(public trainigService: TrainingService, private router: Router, private timerService: TimerService) { }

  ngOnInit(): void {
    this.trainigService.updateTrainingSelected(null, null);
  }

  newTraining() {
    this.router.navigate([RoutesPathEnum.TrainingCard]);
  }

}
