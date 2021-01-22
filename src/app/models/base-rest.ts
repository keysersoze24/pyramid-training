import { RestTime } from "./rest-time";

export abstract class BaseRest {
  restTime: RestTime;

  constructor(restTime: RestTime) {
    this.restTime = restTime;
  }

  async start(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.restTime.startTimer();
      resolve(true);
    })
  }
}
