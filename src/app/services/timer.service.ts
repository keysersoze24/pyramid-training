import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import {
  MILLISEC_IN_SECOND,
  TimerSoundsEnum,
  TimerStatusEnum,
} from '../shared/constants';

// https://www.javascripting.com/view/timer-js
declare var Timer: any

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _secondsElapsed$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _secondsLeft$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _timer: any = new Timer('1 s');

  constructor() {}

  /**
   *
   * @param seconds Durata del timer
   * @param timerSound Suono emesso al termine
   */
  async startTimer(seconds: number, timerSound?: TimerSoundsEnum): Promise<boolean> {
    this._secondsLeft$.next(seconds);
    this._timer.start();
    return new Promise(async resolve => {
      this._timer.every(`1 s`, () => {
        this.updateSecondsValue();
      });
      this._timer.after(`${seconds} s`, () => {
        this.playSound(timerSound);
        this._timer.clear();
        this.resetSecondsValue();
        resolve(true);
      })
    });
  }

  updateSecondsValue() {
    const secondsLeft = this._secondsLeft$.getValue();
    const secondsElapsed = this._secondsElapsed$.getValue();
    this._secondsLeft$.next(secondsLeft - 1);
    this._secondsElapsed$.next(secondsElapsed + 1);
  }



  /*
  stopTimer() {
    this._timer.stop();
  }

  pauseTimer() {
    this._timer.pause();
  }

  resumeTimer() {
    this._timer.resume();
  }
  */

  resetSecondsValue() {
    this._secondsLeft$.next(0);
    this._secondsElapsed$.next(0);
  }

  //#region observables getter
  /*
  getTimerStatus() {
    return this._timerStatus$.asObservable().pipe(share());
  }
  */

  getSecondsLeft(): Observable<number> {
    return this._secondsLeft$.asObservable().pipe(share());
  }

  getSecondElapsed(): Observable<number> {
    return this._secondsElapsed$.asObservable().pipe(share());
  }
  //#endregion

  //#region private methods
  private playSound(timerSound: TimerSoundsEnum) {
    let audio = new Audio(`assets/sounds/${timerSound}.mp3`);
    audio.load();
    audio.play();
  }
}
