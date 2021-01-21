import { BehaviorSubject, Observable } from "rxjs";
import { share } from "rxjs/operators";
import { DoublePyramid } from "./double-pyramid";
import { RestTime } from "./rest-time";


export class Workout {

  doublePyramids: DoublePyramid [] = [];
  restTime: RestTime;
  private _currentPyramid$: BehaviorSubject<DoublePyramid> = new BehaviorSubject(null);

  getCurrentPyramid(): Observable<DoublePyramid> {
    return this._currentPyramid$.asObservable().pipe(share())
  }

  constructor(restTime: RestTime) { this.restTime = restTime };

  async start(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.doublePyramids.length; i++) {
        const pyramid = this.doublePyramids[i];
        this._currentPyramid$.next(pyramid);
        await pyramid.start();
        if (i == this.doublePyramids.length - 1) {
          resolve(true);
        }
        await this.restTime.startTimer();
      }
    })
  }

}
