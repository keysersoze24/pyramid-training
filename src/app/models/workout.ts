import { BehaviorSubject, Observable } from "rxjs";
import { share } from "rxjs/operators";
import { TimerSoundsEnum } from "../shared/constants";
import { Pyramid } from "./pyramid";
import { RestTime } from "./rest-time";


export class Workout {
  restTime: RestTime;
  pyramids: Pyramid [] = [];
  private _currentPyramid$: BehaviorSubject<Pyramid> = new BehaviorSubject(null);
  private _pyramidsDone: number = 0;
  get pyramidsDone(): number { return this._pyramidsDone };

  getCurrentPyramid(): Observable<Pyramid> {
    return this._currentPyramid$.asObservable().pipe(share())
  }

  constructor(secondsRest: number) {
    this.restTime = new RestTime(secondsRest);
  }

  async start(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.pyramids.length; i++) {
        const pyramid = this.pyramids[i];
        this._currentPyramid$.next(pyramid);
        await pyramid.start();
        this._pyramidsDone = this._pyramidsDone ++;
        if (i == this.pyramids.length - 1) {
          resolve(true);
        }
        await this.restTime.startTimer(TimerSoundsEnum.MachineGun);
      }
    })
  }

}
