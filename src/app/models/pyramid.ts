import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { TrainingService } from '../services/training.service';
import { TrainingStatusEnum } from '../shared/constants';
import { PyramidStep } from './pyramid-step';
import { RestTime } from './rest-time';

export class Pyramid {

  private _currentPyramidStep: BehaviorSubject<PyramidStep> = new BehaviorSubject(null);

  basePyramid: number;
  apexPyramid: number;
  reverse: boolean = true;
  restTime: RestTime;
  restTimeReps: RestTime;

  private get _doublePyramid(): number[] {
    let result: number[] = [];

    if (this.reverse) {
      for (let i = this.apexPyramid; i <= this.basePyramid; i++) {
        result.push(i);
      }
      for (let i = this.basePyramid - 1; i >= this.apexPyramid; i--) {
        result.push(i);
      }
    } else {
      for (let i = this.basePyramid; i >= this.apexPyramid; i--) {
        result.push(i);
      }
      for (let i = this.apexPyramid + 1; i <= this.basePyramid; i++) {
        result.push(i);
      }
    }
    return result;
  }

  constructor(
    basePyramid: number,
    apexPyramid: number,
    secondsRest: number,
    secondsRestReps: number,
    reverse: boolean
  ) {
    if (basePyramid > 0 && apexPyramid > 0) {
      if (basePyramid > apexPyramid) {
        this.basePyramid = basePyramid;
        this.apexPyramid = apexPyramid;
      }
    }
    this.restTime = new RestTime(secondsRest);
    this.restTimeReps = new RestTime(secondsRestReps);
    this.reverse = reverse;
  }

  getCurrentPyramidStep() {
    return this._currentPyramidStep.asObservable().pipe(share());
  }

  async start(): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i < this._doublePyramid.length; i++) {
        const pyramidStep = new PyramidStep(this.restTimeReps.secondsSet, this._doublePyramid[i]);
        this._currentPyramidStep.next(pyramidStep);
        await pyramidStep.start();
        await this.restTime.startTimer();
      }
      resolve(true);
    });
  }

}
