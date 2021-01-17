import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { TimerStatusEnum } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private _secondsElapsed$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _secondsLeft$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  startTimer(seconds: number): Promise<TimerStatusEnum> {
    return new Promise((resolve, reject) => {
      this.updateSecondsValue(seconds);
      setTimeout(() => {
        resolve(TimerStatusEnum.Expired);
      }, seconds * 1000);
    })
  }

  getSecondsLeft(): Observable<number> {
    return this._secondsLeft$.asObservable().pipe(share());
  }

  getSecondElapsed(): Observable<number> {
    return this._secondsElapsed$.asObservable().pipe(share());
  }

  private updateSecondsValue(secondsSet: number) {
    this._secondsLeft$.next(secondsSet);
    setInterval(() => {
      const secondsElapsed = this._secondsElapsed$.getValue() + 1;
      this._secondsElapsed$.next(secondsElapsed);
      const secondsLeft: number = secondsSet - secondsElapsed;
      this._secondsLeft$.next(secondsLeft);
    }, 1000);
  }

}
