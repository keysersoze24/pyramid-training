import { BehaviorSubject, Observable } from "rxjs";
import { share } from "rxjs/operators";
import { RestTime } from "./rest-time";

export class PyramidStep {
  restTime: RestTime;
  totalReps: number;

  private _repsToDo$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(secondsRest: number, totalReps: number) {
    this.restTime = new RestTime(secondsRest);
    this.totalReps = totalReps
  }

  async start(): Promise<boolean> {
    return new Promise(async resolve => {
      for (let i = 0; i < this.totalReps; i++) {
        const repsToDo = this.totalReps[i];
        this._repsToDo$.next(repsToDo);
        await this.restTime.startTimer();
      }
      resolve(true);
    })
  }

  getRepsToDo(): Observable<number> {
    return this._repsToDo$.asObservable().pipe(share());
  }

  getRepsToDoSync(): number {
    return this._repsToDo$.getValue();
  }

}
