import { TimerStatusEnum } from "../shared/constants";

export abstract class RestTime {
  private _restTimeMilliseconds: number;

  get restTimeMilliseconds(): number { return this._restTimeMilliseconds };
  set restTimeMilliseconds(value: number) { this._restTimeMilliseconds = value };

  startTimer(): Promise<TimerStatusEnum> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(TimerStatusEnum.Expired);
      }, this._restTimeMilliseconds)
    })
  }

}
