import { DoublePyramid } from "./double-pyramid";
import { RestTime } from "./rest-time";
import { Workout } from "./workout";

export class Training {
  name: string;
  preWorkoutRestTimeSeconds: RestTime;
  workout: Workout;
  postWorkoutRestTimeSeconds: RestTime;
}
