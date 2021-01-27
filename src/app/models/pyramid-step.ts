import { BehaviorSubject, Observable } from "rxjs";
import { share } from "rxjs/operators";
import { TimerSoundsEnum } from "../shared/constants";
import { RestTime } from "./rest-time";

export class PyramidStep {
  restTime: RestTime;
  totalReps: number;

  private _repsToDo$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(secondsRest: number, totalReps: number) {
    this.restTime = new RestTime(secondsRest);
    this.totalReps = totalReps;
    this._repsToDo$.next(totalReps);
  }

  getRepsToDo(): Observable<number> {
    return this._repsToDo$.asObservable().pipe(share());
  }

  getRepsToDoSync(): number {
    return this._repsToDo$.getValue();
  }

  updateRepsToDo(repsToDo: number): void {
    this._repsToDo$.next(repsToDo);
  }

}
