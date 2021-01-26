import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Training } from '../models/training';
import { LocalStorageKeyEnum } from '../shared/constants';
import { Utilities } from '../shared/utilities';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {

  private _allTrainings$: BehaviorSubject<Training[]> = new BehaviorSubject([]);


  constructor() {
    const allTrainings = this.getTrainingsFromLocalStorage();
    if (allTrainings?.length) {
      this._allTrainings$.next(allTrainings);
    }
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


  getAllTrainings(): Observable<Training[]> {
    return this._allTrainings$.asObservable().pipe(share());
  }

  getAllTrainingsSync(): Training [] {
    return this._allTrainings$.getValue();
  }

  saveTraining(training: Training): void {
    let trainings = this._allTrainings$.getValue();
    trainings.push(training);
    Utilities.setLocalStorageItem(LocalStorageKeyEnum.Trainings, trainings);
    this._allTrainings$.next(trainings);
  }

  deleteTraining(trainingId: string): void {
    let trainings = this._allTrainings$.getValue();
    const trainingIndex = trainings.findIndex((t) => t.id == trainingId);
    trainings.splice(trainingIndex, 1);
    Utilities.setLocalStorageItem(LocalStorageKeyEnum.Trainings, trainings);
    this._allTrainings$.next(trainings);
  }

  getTrainingByIdSync(trainingId: string): Training {
    const result = this.getAllTrainingsSync()?.find(training => training?.id == trainingId);
    return result;
  }



}
