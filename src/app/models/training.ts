
import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import { TrainingStatusEnum } from "../shared/constants";
import { Utilities } from "../shared/utilities";
import { DoublePyramid } from "./double-pyramid";
import { PostWorkout } from "./post-workout";
import { PreWorkout } from "./pre-workout";
import { RestTime } from "./rest-time";
import { Workout } from "./workout";

export class Training {

  private _id: string;
  get id(): string { return this._id };
  private _trainingStatus$: BehaviorSubject<TrainingStatusEnum> = new BehaviorSubject(null);

  name: string;
  preWorkout: PreWorkout;
  workout: Workout;
  postWorkout: PostWorkout;

  constructor() {
    this._id = Utilities.newGuid();
    this.defaultTraining();
  }

  private updateStatus(trainingStatus: TrainingStatusEnum) {
    this._trainingStatus$.next(trainingStatus);
  }

  getStatus() {
    return this._trainingStatus$.asObservable().pipe(share())
  }

  async start() {
    this.updateStatus(TrainingStatusEnum.PreWorkout);
    await this.preWorkout.start();
    this.updateStatus(TrainingStatusEnum.Workout);
    await this.workout.start();
    this.updateStatus(TrainingStatusEnum.PostWorkout);
    await this.postWorkout.start();
  }

  private defaultTraining() {
    this.name = 'Default';
    const preWorkoutRestTime = new RestTime(60);
    const preWorkout = new PreWorkout(preWorkoutRestTime);
    this.preWorkout = preWorkout;
    const workoutRestTime = new RestTime(120);
    const workout = new Workout(workoutRestTime);
    const doublePyramidRestTime = new RestTime(2);
    const doublePyramid = new DoublePyramid(1, 5, doublePyramidRestTime, true);
    workout.doublePyramids.push(doublePyramid);
    this.workout = workout;
    const postWorkoutRestTime = new RestTime(60);
    const postWorkout = new PostWorkout(postWorkoutRestTime);
    this.postWorkout = postWorkout;
  }


}
