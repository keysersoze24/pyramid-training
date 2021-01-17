import { DoublePyramid } from "./double-pyramid";
import { RestTime } from "./rest-time";


export class Workout {
  doublePyramids: DoublePyramid [] = [];
  workoutRestTime: RestTime;

  constructor(
    doublePyramid: { basePyramid: number, apexPyramid: number, reverse: boolean },
    doublePyramidReps: number,
    workoutRestTime: RestTime
    ) {
    const dp = new DoublePyramid(doublePyramid.basePyramid, doublePyramid.apexPyramid, doublePyramid.reverse);
      for (let i = 0; i < doublePyramidReps; i++) {
        this.doublePyramids.push(dp);
      }
    this.workoutRestTime = workoutRestTime;
  }
}
