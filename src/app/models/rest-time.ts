import { BehaviorSubject, Observable } from "rxjs";
import { share } from "rxjs/operators";
import { TimerStatusEnum } from "../shared/constants";

export class RestTime {
  private _secondsElapsed$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _secondsLeft$: BehaviorSubject<number> = new BehaviorSubject(0);
  secondsSet: number;

  constructor(seconds: number) {
    this.secondsSet = seconds;
  }

  startTimer(): Promise<TimerStatusEnum> {
    return new Promise((resolve, reject) => {
      this.updateSecondsValue(this.secondsSet);
      setTimeout(() => {
        resolve(TimerStatusEnum.Expired);
      }, this.secondsSet * 1000);
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
