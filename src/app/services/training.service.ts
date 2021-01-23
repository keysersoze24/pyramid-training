import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Training } from '../models/training';
import { TrainingSelected } from '../models/training-selected';
import { LocalStorageKeyEnum, TrainingStatusEnum } from '../shared/constants';
import { Utilities } from '../shared/utilities';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  //#region private props
  private _allTrainings$: BehaviorSubject<Training[]> = new BehaviorSubject([]);
  private _trainingSelected$: BehaviorSubject<TrainingSelected> = new BehaviorSubject(null);
  //#endregion

  constructor() {
    const allTrainings = this.getTrainingsFromLocalStorage();
    if (allTrainings?.length) {
      this._allTrainings$.next(allTrainings);
    }
  }

  //#region all trainings
  getAllTrainings(): Observable<Training[]> {
    return this._allTrainings$.asObservable().pipe(share());
  }

  addTraining(training: Training) {
    let trainings = this._allTrainings$.getValue();
    trainings.push(training);
    Utilities.setLocalStorageItem(LocalStorageKeyEnum.Trainings, trainings);
    this._allTrainings$.next(trainings);
  }

  deleteTraining(trainingId: string) {
    let trainings = this._allTrainings$.getValue();
    const trainingIndex = trainings.findIndex((t) => t.id == trainingId);
    trainings.splice(trainingIndex, 1);
    Utilities.setLocalStorageItem(LocalStorageKeyEnum.Trainings, trainings);
    this._allTrainings$.next(trainings);
  }
  //#endregion

  //#region training selected
  updateTrainingSelected(status: TrainingStatusEnum, trainig?: Training): void {
    let trainingSelected: TrainingSelected;
    if (trainig) {
      trainingSelected = new TrainingSelected(status, trainig);
    }
    else {
      const existingTraining = this._trainingSelected$.getValue()?.training;
      trainingSelected = new TrainingSelected(status, existingTraining);
    }
    this._trainingSelected$.next(trainingSelected);
  }

  getTrainingSelected(): Observable<TrainingSelected> {
    return this._trainingSelected$.asObservable().pipe(share());
  }

  getTrainingSelectedSync(): TrainingSelected {
    return this._trainingSelected$.getValue();
  }
  //#endregion


  //#region public methods
  async startTraining(training: Training): Promise<boolean> {
    return new Promise(async resolve => {
      this.updateTrainingSelected(TrainingStatusEnum.PreWorkout, training);
      await training.preWorkout.restTime.startTimer();
      this.updateTrainingSelected(TrainingStatusEnum.Workout);
      await training.workout.start();
      // await training.workout.restTime.startTimer();
      this.updateTrainingSelected(TrainingStatusEnum.PostWorkout);
      await training.postWorkout.restTime.startTimer();
      this.updateTrainingSelected(TrainingStatusEnum.Finish);
      resolve(true);
    });
  }
  //#endregion

  //#region private methods
  private getTrainingsFromLocalStorage(): Training[] {
    const rawTrainings: Training[] = <Training[]>(
      Utilities.getLocalStorageItem(LocalStorageKeyEnum.Trainings)
    );
    if (rawTrainings?.length) {
      const allTrainings = rawTrainings.map(
        (training) => new Training(training)
      );
      return allTrainings;
    } else {
      return null;
    }
  }
  //#endregion

}
