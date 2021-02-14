import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pyramid } from 'src/app/models/pyramid';
import { PyramidStep } from 'src/app/models/pyramid-step';
import { Training } from 'src/app/models/training';
import { Workout } from 'src/app/models/workout';
import { AppStatusService } from 'src/app/services/app-status.service';
import { ConfigService } from 'src/app/services/config.service';
import { TimerService } from 'src/app/services/timer.service';
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
  repsToDo: number;
  showRepsToDo: boolean;
  showTimer: boolean = true;

  constructor(
    public trainingService: TrainingService,
    public timerService: TimerService,
    public configService: ConfigService,
    public appStatusService: AppStatusService,
    private router: Router
  ) {
    const trainingId: string = this.router.getCurrentNavigation()?.extras?.state
      ?.trainingId;
    if (trainingId?.length) {
      this.training = this.trainingService.getTrainingByIdSync(trainingId);
      this.startTraining(this.training);
    } else {
      this.navigateHome();
    }
  }

  async startTraining(training: Training) {
    this.appStatusService.updateTrainingStatus(TrainingStatusEnum.PreWorkout);
    await this.timerService.startTimer(training.preWorkout.restSeconds);
    this.appStatusService.updateTrainingStatus(TrainingStatusEnum.Workout);
    training.workout.updateRemainingPyramids(training.workout.pyramids.length);
    await this.executeWorkout(training.workout);
    this.appStatusService.updateTrainingStatus(TrainingStatusEnum.PostWorkout);
    await this.timerService.startTimer(training.postWorkout.restSeconds, TimerSoundsEnum.MachineGun);
    this.navigateHome();
  }

  // esecuzione di tutte le piramidi + tempo di recupero tra una e l'altra
  async executeWorkout(workout: Workout): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i < workout.pyramids.length; i++) {
        const pyramid = workout.pyramids[i];
        await this.executePyramidSteps(pyramid);
        workout.updatePyramidsDone(workout.getPyramidsDoneSync() + 1);
        workout.updateRemainingPyramids(workout.pyramids.length - workout.getPyramidsDoneSync())
        if (i < workout?.pyramids?.length - 1) {
          await this.timerService.startTimer(workout.restTime.restSeconds, TimerSoundsEnum.MachineGun);
        }
      }
      resolve(true);
    });
  }

  // esecuzione di tutti gli step (piani) di una singola piramide
  async executePyramidSteps(pyramid: Pyramid): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i < pyramid.doublePyramid?.length; i++) {
        this.showRepsToDo = true;
        const pyramidStep = pyramid.doublePyramid[i];
        pyramid.updateCurrentPyramidStep(pyramidStep);
        this.repsToDo = pyramidStep.totalReps;
        this.showTimer = false;
        await this.executePyramidShots(pyramidStep);
        this.showTimer = true;
        this.showRepsToDo = false;
        if (i < pyramid?.doublePyramid?.length - 1) {
          await this.timerService.startTimer(pyramid.restTime.restSeconds);
        }
      }
      resolve(true);
    });
  }

  // esecuzione delle "botte" di un singolo step
  async executePyramidShots(pyramidStep: PyramidStep): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i < pyramidStep.totalReps; i++) {
        await this.timerService.startTimer(pyramidStep.restTime.restSeconds, TimerSoundsEnum.Gun);
      }
      resolve(true);
    });
  }

  //#region private methods

  private navigateHome() {
    setTimeout(() => {
      this.router.navigate([RoutesPathEnum.Home]);
    }, 1000);
  }

  //#endregion
}
