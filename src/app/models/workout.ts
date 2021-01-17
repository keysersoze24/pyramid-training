import { DoublePyramid } from "./double-pyramid";
import { RestTime } from "./rest-time";
import { WorkoutStatus } from "./workout-status";


export class Workout {

  doublePyramids: DoublePyramid [] = [];
  workoutRestTime: RestTime;
  doublePyramidRestTime: RestTime;

  private _workoutStatus: WorkoutStatus = new WorkoutStatus(1, 1);
  get workoutStatus(): WorkoutStatus { return this._workoutStatus };

  scroll() {
    if (this.doublePyramids[0].doublePyramid.length == this._workoutStatus.currentDoublePyramidStep) {
      this._workoutStatus.currentDoublePyramid = this._workoutStatus.currentDoublePyramid + 1;
    }
    else {
      this._workoutStatus.currentDoublePyramidStep = this._workoutStatus.currentDoublePyramidStep + 1;
    }
  }

  constructor(
    doublePyramid: { basePyramid: number, apexPyramid: number, reverse: boolean },
    doublePyramidReps: number,
    workoutRestTime: RestTime,
    doublePyramidRestTime: RestTime
    ) {
    const dp = new DoublePyramid(doublePyramid.basePyramid, doublePyramid.apexPyramid, doublePyramid.reverse);
      for (let i = 0; i < doublePyramidReps; i++) {
        this.doublePyramids.push(dp);
      }
    this.workoutRestTime = workoutRestTime;
    this.doublePyramidRestTime = doublePyramidRestTime;
  }

}
