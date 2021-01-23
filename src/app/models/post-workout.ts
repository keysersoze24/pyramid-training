import { RestTime } from "./rest-time";

export class PostWorkout {

  restTime: RestTime;

  constructor(secondsRest: number) {
    this.restTime = new RestTime(secondsRest);
  }

}
