import { DoublePyramid } from "./double-pyramid";
import { WorkoutRestTime } from "./training-rest-time";
import { Workout } from "./workout";

export class Training {
  name: string;
  preWorkoutRestTimeMillisecond: WorkoutRestTime;
  workout: Workout;
  postWorkoutRestTimeMillisecond: WorkoutRestTime;
}
