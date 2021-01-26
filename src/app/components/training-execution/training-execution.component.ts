import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pyramid } from 'src/app/models/pyramid';
import { PyramidStep } from 'src/app/models/pyramid-step';
import { RestTime } from 'src/app/models/rest-time';
import { Training } from 'src/app/models/training';
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
export class TrainingExecutionComponent {
  TimerStatuEnum = TimerStatusEnum;
  TrainingStatusEnum = TrainingStatusEnum;
  training: Training;
  currentRestTime: RestTime;

  constructor(
    public trainingService: TrainingService,
    public configService: ConfigService,
    private router: Router
  ) {
    const trainingId: string = this.router.getCurrentNavigation()?.extras?.state?.trainingId;
    if (trainingId?.length) {
      this.training = this.trainingService.getTrainingByIdSync(trainingId);
      this.startTraining(this.training);
    }
  }


  navigateHome() {
    setTimeout(() => {
      this.router.navigate([RoutesPathEnum.Home]);
    }, 1000);
  }


  async startTraining(training: Training) {
    this.currentRestTime = training.preWorkout.restTime;
    await this.currentRestTime.startTimer();
    await this.executeWorkout(training.workout);
    this.currentRestTime = training.postWorkout.restTime;
    await this.currentRestTime.startTimer();
  }




  async executeWorkout(workout: Workout): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < workout.pyramids.length; i++) {
        const pyramid = workout.pyramids[i];
        workout.updateCurrentPyramid(pyramid);
        this.currentRestTime = pyramid.restTime;
        await this.executePyramidSteps(pyramid);
        workout.updatePyramidsDone(workout.getPyramidsDoneSync() + 1)
        if (i == workout.pyramids.length - 1) {
          resolve(true);
        }
        await workout.restTime.startTimer(TimerSoundsEnum.MachineGun);
      }
    })
  }


  async executePyramidSteps(pyramid: Pyramid): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i < pyramid.doublePyramid?.length; i++) {
        const pyramidStep = new PyramidStep(pyramid.restTimeReps?.secondsSet, pyramid.doublePyramid[i]);
        pyramid.updatePyramidStep(pyramidStep);
        await this.executePyramidShots(pyramidStep);
        await pyramidStep.restTime?.startTimer();
      }
      resolve(true);
    });
  }


  async executePyramidShots(pyramidStep: PyramidStep): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i <  pyramidStep.getRepsToDoSync(); i++) {
        const repsToDo = pyramidStep.getRepsToDoSync[i];
        pyramidStep.updateRepsToDo(repsToDo);
        await pyramidStep.restTime.startTimer(TimerSoundsEnum.Gun);
      }
      resolve(true);
    })
  }
}
