import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { RestTime } from '../models/rest-time';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private _currentRestTime$: BehaviorSubject<RestTime> = new BehaviorSubject(null);

  getCurrentRestTime(): Observable<RestTime> {
    return this._currentRestTime$.asObservable().pipe(share());
  }

  getCurrentRestTimeSync(): RestTime {
    return this._currentRestTime$.getValue();
  }

  updateCurrentRestTime(restTime: RestTime): void {
    this._currentRestTime$.next(restTime);
  }



  constructor() { }
}
