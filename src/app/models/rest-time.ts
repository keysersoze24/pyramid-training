import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import Timer from 'tiny-timer';
import { MILLISEC_SECOND, TimerStatusEnum } from '../shared/constants';

export class RestTime {
  //#region private props
  private _secondsElapsed$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _secondsLeft$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _timerStatus$: BehaviorSubject<TimerStatusEnum> = new BehaviorSubject(TimerStatusEnum.Stopped);
  private _timerProgress$: BehaviorSubject<number> = new BehaviorSubject(100);
  private _timer: Timer;
  //#region public props
  secondsSet: number;

  constructor(seconds: number) {
    this.secondsSet = seconds;
    this._secondsLeft$.next(seconds);
    this._timer = new Timer({ interval: MILLISEC_SECOND, stopwatch: true });
  }

  startTimer(): Promise<boolean> {
    return new Promise(resolve => {
      this._timer.on('statusChanged', (status: TimerStatusEnum) => {
        this._timerStatus$.next(status);
      });
      this._timer.on('tick', (ms) => {
        const progressTimerValue = (ms * 100) / (this.secondsSet * MILLISEC_SECOND);
        this._timerProgress$.next(progressTimerValue);
        if (ms != 0) {
          const secondsElapsed = this._secondsElapsed$.getValue() + 1;
          this._secondsElapsed$.next(secondsElapsed);
          this._secondsLeft$.next(this.secondsSet - secondsElapsed);
        }
      });
      this._timer.on('done', () => {
        resolve(true);
      });
      this._timer.start(this.secondsSet * MILLISEC_SECOND);
    })
  }

  stopTimer() {
    this._timer.stop();
  }

  pauseTimer() {
    this._timer.pause();
  }

  resumeTimer() {
    this._timer.resume();
  }

  //#region observables getter
  getTimerStatus() {
    return this._timerStatus$.asObservable().pipe(share());
  }

  getTimerProgress() {
    return this._timerProgress$.asObservable().pipe((share()));
  }

  getSecondsLeft(): Observable<number> {
    return this._secondsLeft$.asObservable().pipe(share());
  }

  getSecondElapsed(): Observable<number> {
    return this._secondsElapsed$.asObservable().pipe(share());
  }
  //#endregion
}
