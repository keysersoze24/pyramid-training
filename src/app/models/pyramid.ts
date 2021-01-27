import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { PyramidStep } from './pyramid-step';
import { RestTime } from './rest-time';

export class Pyramid {

  private _currentPyramidStep: BehaviorSubject<PyramidStep> = new BehaviorSubject(null);

  basePyramid: number;
  apexPyramid: number;
  reverse: boolean = true;
  restTime: RestTime;
  restTimeShots: RestTime;

  get doublePyramid(): PyramidStep[] {
    let result: PyramidStep[] = [];

    if (this.reverse) {
      for (let i = this.apexPyramid; i <= this.basePyramid; i++) {
        result.push(new PyramidStep(this.restTimeShots.secondsSet, i));
      }
      for (let i = this.basePyramid - 1; i >= this.apexPyramid; i--) {
        result.push(new PyramidStep(this.restTimeShots.secondsSet, i));
      }
    } else {
      for (let i = this.basePyramid; i >= this.apexPyramid; i--) {
        result.push(new PyramidStep(this.restTimeShots.secondsSet, i));
      }
      for (let i = this.apexPyramid + 1; i <= this.basePyramid; i++) {
        result.push(new PyramidStep(this.restTimeShots.secondsSet, i));
      }
    }
    return result;
  }

  constructor(
    basePyramid: number,
    apexPyramid: number,
    secondsRest: number,
    secondsRestShots: number,
    reverse: boolean
  ) {
    if (basePyramid > 0 && apexPyramid > 0) {
      if (basePyramid > apexPyramid) {
        this.basePyramid = basePyramid;
        this.apexPyramid = apexPyramid;
      }
    }
    this.restTime = new RestTime(secondsRest);
    this.restTimeShots = new RestTime(secondsRestShots);
    this.reverse = reverse;
  }

  getCurrentPyramidStep(): Observable<PyramidStep> {
    return this._currentPyramidStep.asObservable().pipe(share());
  }

  updateCurrentPyramidStep(pyramidStep: PyramidStep) {
    this._currentPyramidStep.next(pyramidStep);
  }

}
