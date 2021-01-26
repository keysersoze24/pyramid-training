import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from 'src/app/services/training.service';
import { RoutesPathEnum, TrainingStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  TrainingStatusEnum = TrainingStatusEnum;

  constructor(public trainigService: TrainingService, private router: Router) { }

  newTraining() {
    this.router.navigate([RoutesPathEnum.TrainingCard]);
  }

}
