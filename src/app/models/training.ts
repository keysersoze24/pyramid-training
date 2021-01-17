
import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import { TrainingStatusEnum } from "../shared/constants";
import { Utilities } from "../shared/utilities";
import { DoublePyramid } from "./double-pyramid";
import { RestTime } from "./rest-time";
import { Workout } from "./workout";

export class Training {
  id: string = Utilities.newGuid();
  name: string;
  preWorkoutRestTime: RestTime;
  workout: Workout;
  postWorkoutRestTime: RestTime;

  private _trainingStatus$: BehaviorSubject<TrainingStatusEnum> = new BehaviorSubject(null);

  updateStatus(trainingStatus: TrainingStatusEnum) {
    this._trainingStatus$.next(trainingStatus);
  }

  getStatus() {
    return this._trainingStatus$.asObservable().pipe(share())
  }


}
