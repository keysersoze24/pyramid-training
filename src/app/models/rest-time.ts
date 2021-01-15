import { TimerStatusEnum } from "../shared/constants";

export abstract class RestTime {
  private _restTimeMilliseconds: number;

  startTimer(): Promise<TimerStatusEnum> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(TimerStatusEnum.Expired);
      }, this._restTimeMilliseconds)
    })
  }

  constructor(restTimeMilliseconds: number) {
    this._restTimeMilliseconds = restTimeMilliseconds;
  }

}
