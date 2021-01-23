import { RestTime } from "./rest-time";

export class PreWorkout {

  restTime: RestTime;

  constructor(secondsRest: number) {
    this.restTime = new RestTime(secondsRest);
  }
}
