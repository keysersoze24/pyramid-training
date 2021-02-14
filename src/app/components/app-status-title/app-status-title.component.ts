import { Component, OnInit } from '@angular/core';
import { AppStatusService } from 'src/app/services/app-status.service';
import { TrainingStatusEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-status-title',
  templateUrl: './app-status-title.component.html',
  styleUrls: ['./app-status-title.component.scss'],
})
export class AppStatusTitleComponent {
  appTitle: string;

  constructor(private appStatusService: AppStatusService) {
    appStatusService.getTrainingStatus().subscribe((status) => {
      switch (status) {
        case TrainingStatusEnum.PreWorkout:
          this.appTitle = `Pre workout`;
          break;
        case TrainingStatusEnum.Workout:
          this.appTitle = `Workout`;
          break;
        case TrainingStatusEnum.PostWorkout:
          this.appTitle = `Post workout`;
          break;
        case TrainingStatusEnum.Finish:
          this.appTitle = `Finished`;
          break;
        default:
          break;
      }
    });
  }
}
