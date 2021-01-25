import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestTime } from 'src/app/models/rest-time';
import { TrainingSelected } from 'src/app/models/training-selected';
import { Workout } from 'src/app/models/workout';
import { ConfigService } from 'src/app/services/config.service';
import { TrainingService } from 'src/app/services/training.service';
import {
  RoutesPathEnum,
  TimerSoundsEnum,
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
    this.trainingService.getTrainingSelected().subscribe(async (trainingSelected) => {
      switch (trainingSelected?.status) {
        case TrainingStatusEnum.PreWorkout:
          this.currentRestTime = trainingSelected.restTime;
          break;
        case TrainingStatusEnum.Workout:
          const workout = trainingSelected.training.workout;
          await this.executePyramids(workout);



          this.trainingService.updateTrainingSelected(TrainingStatusEnum.Workout)
          this.currentRestTime = trainingSelected.restTime;
          break;
        case TrainingStatusEnum.PyramidStep:
          this.currentRestTime = trainingSelected.restTime;
          break;
        case TrainingStatusEnum.PyramidShot:
          this.currentRestTime = trainingSelected.restTime;
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


  async executePyramids(workout: Workout): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < workout.pyramids.length; i++) {
        const pyramid = workout.pyramids[i];
        workout.updateCurrentPyramid(pyramid);
        this.currentRestTime = pyramid.restTime;
        await pyramid.start();
        workout.updatePyramidsDone(workout.getPyramidsDoneSync() + 1)
        if (i == workout.pyramids.length - 1) {
          resolve(true);
        }
        await workout.restTime.startTimer(TimerSoundsEnum.MachineGun);
      }
    })
  }
}
