import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { Training } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private _allTrainings$: BehaviorSubject<Training []> = new BehaviorSubject([]);

  constructor() { }

  getAllTrainings() {
    return this._allTrainings$.asObservable().pipe(share());
  }

  addTraining(training: Training) {
    let trainings = this._allTrainings$.getValue();
    trainings.push(training);
    this._allTrainings$.next(trainings);
  }

  deleteTraining(training: Training) {
    let trainings = this._allTrainings$.getValue();
    const trainingIndex = trainings.findIndex(t => t.id == training.id);
    trainings.splice(trainingIndex, 1);
    this._allTrainings$.next(trainings);
  }
}
