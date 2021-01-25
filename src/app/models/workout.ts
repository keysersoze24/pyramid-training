import { BehaviorSubject, Observable } from "rxjs";
import { share } from "rxjs/operators";
import { Pyramid } from "./pyramid";
import { RestTime } from "./rest-time";


export class Workout {
  restTime: RestTime;
  pyramids: Pyramid [] = [];
  private _currentPyramid$: BehaviorSubject<Pyramid> = new BehaviorSubject(null);
  private _pyramidsDone$: BehaviorSubject<number> = new BehaviorSubject(0);


  getCurrentPyramid(): Observable<Pyramid> {
    return this._currentPyramid$.asObservable().pipe(share())
  }

  updateCurrentPyramid(pyramid: Pyramid): void {
    this._currentPyramid$.next(pyramid);
  }

  getPyramidsDone(): Observable<number> {
    return this._pyramidsDone$.asObservable().pipe(share());
  }

  getPyramidsDoneSync(): number {
    return this._pyramidsDone$.getValue();
  }

  updatePyramidsDone(pyramidsDone: number): void {
    this._pyramidsDone$.next(pyramidsDone);
  }

  constructor(secondsRest: number) {
    this.restTime = new RestTime(secondsRest);
  }

}
