import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { RestTime } from './rest-time';

export class DoublePyramid {
  private _basePyramid: number;
  private _apexPyramid: number;
  private _reverse: boolean = true;
  private _restTime: RestTime;
  private _repsToDo$: BehaviorSubject<number> = new BehaviorSubject(0);

  getRepsToDo(): Observable<number> {
    return this._repsToDo$.asObservable().pipe(share());
  }

  get doublePyramid(): number[] {
    let result: number[] = [];

    if (this._reverse) {
      for (let i = this._apexPyramid; i <= this._basePyramid; i++) {
        result.push(i);
      }
      for (let i = this._basePyramid - 1; i >= this._apexPyramid; i--) {
        result.push(i);
      }
    } else {
      for (let i = this._basePyramid; i >= this._apexPyramid; i--) {
        result.push(i);
      }
      for (let i = this._apexPyramid + 1; i <= this._basePyramid; i++) {
        result.push(i);
      }
    }
    return result;
  }

  constructor(
    basePyramid: number,
    apexPyramid: number,
    restTime: RestTime,
    reverse: boolean
  ) {
    if (basePyramid > 0 && apexPyramid > 0) {
      if (basePyramid > apexPyramid) {
        this._basePyramid = basePyramid;
        this._apexPyramid = apexPyramid;
      }
    }
    this._restTime = restTime;
    this._reverse = reverse;
  }

  async start(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.doublePyramid.length; i++) {
        // todoandrea tempo tra una ripetizione e l'altra
        this._repsToDo$.next(this.doublePyramid[i]);
        await this._restTime.startTimer();
        if (i == this.doublePyramid.length - 1) {
          resolve(true);
        }
      }
    });
  }
}
