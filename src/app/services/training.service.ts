import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Training, TrainingSelected } from '../models/training';
import { LocalStorageKeyEnum, TrainingStatusEnum } from '../shared/constants';
import { Utilities } from '../shared/utilities';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private _allTrainings$: BehaviorSubject<Training[]> = new BehaviorSubject([]);
  private _trainingSelected$: BehaviorSubject<TrainingSelected> = new BehaviorSubject({ training: null, status: TrainingStatusEnum.Stop });

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
  updateTrainingSelected(status: TrainingStatusEnum, trainig?: Training, ): void {
    let trainingSelected: TrainingSelected;
    if (trainig) {
      trainingSelected = { training: trainig, status: status };
    }
    else {
      trainingSelected = { training: this._trainingSelected$.getValue()?.training, status };
    }
    this._trainingSelected$.next(trainingSelected);

  }

  getTrainingSelected(): Observable<TrainingSelected> {
    return this._trainingSelected$.asObservable().pipe(share());
  }
  //#endregion


  //#region methods
  async startTraining(training: Training): Promise<boolean> {
    if (!this._trainingSelected$.getValue()?.training?.id) {
      this.updateTrainingSelected(TrainingStatusEnum.Stop, training);
    }
    return new Promise(async (resolve, reject) => {
      this.updateTrainingSelected(TrainingStatusEnum.PreWorkout);
      await this._trainingSelected$.getValue()?.training?.preWorkout.start();
      this.updateTrainingSelected(TrainingStatusEnum.Workout);
      await this._trainingSelected$.getValue()?.training?.workout.start();
      this.updateTrainingSelected(TrainingStatusEnum.PostWorkout);
      await this._trainingSelected$.getValue()?.training?.postWorkout.start();
      this.updateTrainingSelected(null);
      resolve(true);
    });
  }

  stopTraining() {
    this.updateTrainingSelected(TrainingStatusEnum.Stop, null);
  }


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
