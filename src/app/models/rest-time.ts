import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export class RestTime {
  private _secondsElapsed$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _secondsLeft$: BehaviorSubject<number> = new BehaviorSubject(0);
  secondsSet: number;

  constructor(seconds: number) {
    this.secondsSet = seconds;
    this._secondsLeft$.next(seconds);
  }

  startTimer(): Promise<boolean> {
    return new Promise((resolve) => {
      const secondsLeft = this._secondsLeft$.getValue();
      if (secondsLeft == 0) {
        resolve(true);
      } else {
        setTimeout(() => {
          this.updateSecondsValue(secondsLeft);
          this.startTimer();
        }, 1000);
      }
    });
  }

  private _runTimer() {
    const secondsLeft = this._secondsLeft$.getValue();
    setTimeout(() => {
      this.updateSecondsValue(secondsLeft);
      this._runTimer();
    }, 1000);
  }

  getSecondsLeft(): Observable<number> {
    return this._secondsLeft$.asObservable().pipe(share());
  }

  getSecondElapsed(): Observable<number> {
    return this._secondsElapsed$.asObservable().pipe(share());
  }

  private updateSecondsValue(secondsLeft: number): void {
    const secondsElapsed = this._secondsElapsed$.getValue() + 1;
    this._secondsElapsed$.next(secondsElapsed);
    this._secondsLeft$.next(secondsLeft - 1);
  }
}
