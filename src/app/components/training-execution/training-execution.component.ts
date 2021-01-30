import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pyramid } from 'src/app/models/pyramid';
import { PyramidStep } from 'src/app/models/pyramid-step';
import { Training } from 'src/app/models/training';
import { Workout } from 'src/app/models/workout';
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

  constructor(
    public trainingService: TrainingService,
    public timerService: TimerService,
    public configService: ConfigService,
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

  ngOnInit(): void { }

  async startTraining(training: Training) {
    await this.timerService.startTimer(training.preWorkout.restSeconds, TimerSoundsEnum.MachineGun);
    await this.executeWorkout(training.workout);
    await this.timerService.startTimer(training.postWorkout.restSeconds, TimerSoundsEnum.Gun);
  }

  // esecuzione di tutte le piramidi + tempo di recupero tra una e l'altra

  async executeWorkout(workout: Workout): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i < workout.pyramids.length; i++) {
        const pyramid = workout.pyramids[i];
        await this.executePyramidSteps(pyramid);
        workout.updatePyramidsDone(workout.getPyramidsDoneSync() + 1);
        await this.timerService.startTimer(workout.restTime.restSeconds);
      }
      resolve(true);
    });
  }

  // esecuzione di tutti gli step (piani) di una singola piramide
  async executePyramidSteps(pyramid: Pyramid): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i < pyramid.doublePyramid?.length; i++) {
        const pyramidStep = pyramid.doublePyramid[i];
        pyramid.updateCurrentPyramidStep(pyramidStep);
        await this.executePyramidShots(pyramidStep);
        await this.timerService.startTimer(pyramid.restTime.restSeconds, TimerSoundsEnum.MachineGun);
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
