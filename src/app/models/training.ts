import { Utilities } from "../shared/utilities";
import { Pyramid } from "./pyramid";
import { PostWorkout } from "./post-workout";
import { PreWorkout } from "./pre-workout";
import { RestTime } from "./rest-time";
import { Workout } from "./workout";

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
      this.preWorkout = new PreWorkout(training.preWorkout?.restTime?.secondsSet);
      this.workout = new Workout(training.workout?.restTime?.secondsSet);
      this.workout.pyramids = training.workout?.pyramids.map(pyramid => {
        return new Pyramid(pyramid.basePyramid, pyramid.apexPyramid, pyramid.restTime.secondsSet, pyramid.restTimeShots.secondsSet, pyramid.reverse);
      })
      this.postWorkout = new PostWorkout(training.postWorkout.restTime?.secondsSet);
    }
  }


  private defaultTraining() {
    this.name = 'Default';
    const preWorkout = new PreWorkout(10);
    this.preWorkout = preWorkout;
    const workout = new Workout(10);
    const pyramid = new Pyramid(3, 1, 10, 2, true);
    workout.pyramids.push(pyramid);
    workout.pyramids.push(pyramid);
    this.workout = workout;
    const postWorkout = new PostWorkout(10);
    this.postWorkout = postWorkout;
  }

}
