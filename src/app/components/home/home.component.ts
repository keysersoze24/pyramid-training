import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestTime } from 'src/app/models/rest-time';
import { Training } from 'src/app/models/training';
import { Workout } from 'src/app/models/workout';
import { TrainingService } from 'src/app/services/training.service';
import { RoutesPathEnum, TrainingStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  TrainingStatusEnum = TrainingStatusEnum;

  constructor(public trainigService: TrainingService, private router: Router) { }

  ngOnInit(): void {
    this.trainigService.updateTrainingSelected(null, null);
  }

  newTraining() {
    this.router.navigate([RoutesPathEnum.TrainingCard]);
  }

}
