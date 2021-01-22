import { Utilities } from "../shared/utilities";
import { Pyramid } from "./pyramid";
import { PostWorkout } from "./post-workout";
import { PreWorkout } from "./pre-workout";
import { RestTime } from "./rest-time";
import { Workout } from "./workout";
import { TrainingStatusEnum } from "../shared/constants";

export class Training {

  private _id: string;
  get id(): string { return this._id };

  name: string;
  preWorkout: PreWorkout;
  workout: Workout;
  postWorkout: PostWorkout;

  constructor(training?: Training) {
    this._id = Utilities.newGuid();
    this.defaultTraining();
    if (training) {
      this.name = training.name;
      this.preWorkout = new PreWorkout(new RestTime(training.preWorkout?.restTime?.secondsSet));
      this.workout = new Workout(new RestTime(training.workout?.restTime?.secondsSet));
      this.workout.pyramids = training.workout?.pyramids.map(pyramid => {
        return new Pyramid(pyramid.basePyramid, pyramid.apexPyramid, new RestTime(pyramid.restTime.secondsSet), pyramid.reverse);
      })
      this.postWorkout = new PostWorkout(new RestTime(training.postWorkout.restTime?.secondsSet));
    }
  }


  private defaultTraining() {
    this.name = 'Default';
    const preWorkoutRestTime = new RestTime(60);
    const preWorkout = new PreWorkout(preWorkoutRestTime);
    this.preWorkout = preWorkout;
    const workoutRestTime = new RestTime(120);
    const workout = new Workout(workoutRestTime);
    const pyramidRestTime = new RestTime(2);
    const pyramid = new Pyramid(5, 1, pyramidRestTime, true);
    workout.pyramids.push(pyramid);
    this.workout = workout;
    const postWorkoutRestTime = new RestTime(60);
    const postWorkout = new PostWorkout(postWorkoutRestTime);
    this.postWorkout = postWorkout;
  }

}

export interface TrainingSelected {
  training: Training;
  status: TrainingStatusEnum;
}
