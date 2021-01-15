import { DoublePyramid } from "./double-pyramid";
import { WorkoutRestTime } from "./training-rest-time";

export class Workout {
  doublePyramids: DoublePyramid [] = [];
  workoutRestTime: WorkoutRestTime;

  constructor(
    doublePyramid: { basePyramid: number, apexPyramid: number, reverse: boolean },
    doublePyramidReps: number,
    workoutRestTime: WorkoutRestTime
    ) {
    const dp = new DoublePyramid(doublePyramid.basePyramid, doublePyramid.apexPyramid, doublePyramid.reverse);
      for (let i = 0; i < doublePyramidReps; i++) {
        this.doublePyramids.push(dp);
      }
    this.workoutRestTime = workoutRestTime;
  }
}
