import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { TrainingStatusEnum } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AppStatusService {

  private _trainingStatus$: BehaviorSubject<TrainingStatusEnum> = new BehaviorSubject(null);

  updateTrainingStatus(trainingStatus: TrainingStatusEnum) {
    this._trainingStatus$.next(trainingStatus);
  }

  getTrainingStatus() {
    return this._trainingStatus$.asObservable().pipe(share());
  }

  constructor() { }
}
