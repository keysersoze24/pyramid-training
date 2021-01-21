import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { RestTime } from './rest-time';

export class Pyramid {
  basePyramid: number;
  apexPyramid: number;
  reverse: boolean = true;
  restTime: RestTime;

  private _repsToDo$: BehaviorSubject<number> = new BehaviorSubject(0);

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
    restTime: RestTime,
    reverse: boolean
  ) {
    if (basePyramid > 0 && apexPyramid > 0) {
      if (basePyramid > apexPyramid) {
        this.basePyramid = basePyramid;
        this.apexPyramid = apexPyramid;
      }
    }
    this.restTime = restTime;
    this.reverse = reverse;
  }

  getRepsToDo(): Observable<number> {
    return this._repsToDo$.asObservable().pipe(share());
  }

  async start(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this._doublePyramid.length; i++) {
        // todoandrea tempo tra una ripetizione e l'altra
        this._repsToDo$.next(this._doublePyramid[i]);
        await this.restTime.startTimer();
        if (i == this._doublePyramid.length - 1) {
          resolve(true);
        }
      }
    });
  }

}
