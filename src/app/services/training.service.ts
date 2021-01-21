import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Training } from '../models/training';
import { LocalStorageKeyEnum } from '../shared/constants';
import { Utilities } from '../shared/utilities';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private _allTrainings$: BehaviorSubject<Training []> = new BehaviorSubject([]);

  constructor() {
    const allTrainings = this.getTrainingsFromLocalStorage()
    if(allTrainings?.length) {
      this._allTrainings$.next(allTrainings);
    }
  }

  getAllTrainings(): Observable<Training []> {
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
    const trainingIndex = trainings.findIndex(t => t.id == trainingId);
    trainings.splice(trainingIndex, 1);
    Utilities.setLocalStorageItem(LocalStorageKeyEnum.Trainings, trainings);
    this._allTrainings$.next(trainings);
  }

  private getTrainingsFromLocalStorage(): Training[] {
    const rawTrainings: Training [] = <Training[]>Utilities.getLocalStorageItem(LocalStorageKeyEnum.Trainings);
    if (rawTrainings?.length) {
      const allTrainings = rawTrainings.map(training => new Training(training));
      return allTrainings;
    }
    else {
      return null;
    }
  }
}
