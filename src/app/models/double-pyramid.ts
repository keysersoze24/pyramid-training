import { DoublePyramidStepStatusEnum } from "../shared/constants";
import { RestTime } from "./rest-time";

export class DoublePyramid {
  private _basePyramid: number;
  private _apexPyramid: number;
  private _reverse: boolean = true;
  private _currentStep: number = 0;

  get currentStep(): number { return this._currentStep };
  set currentStep(value: number) { this._currentStep = value };

  get doublePyramid(): number [] {
    let result: number [] = [];

    if (this._reverse) {
      for (let i = this._apexPyramid; i <= this._basePyramid; i++) {
        result.push(i);
      }
      for (let i = this._basePyramid - 1; i >= this._apexPyramid; i--) {
        result.push(i);
      }
    } else {
      for (let i = this._basePyramid; i >= this._apexPyramid; i--) {
        result.push(i);
      }
      for (let i = this._apexPyramid + 1; i <= this._basePyramid; i++) {
        result.push(i);
      }
    }
    return result;
  }


  constructor(basePyramid: number, apexPyramid: number, reverse: boolean) {
    if (reverse != null || reverse != undefined) {
       this._reverse = reverse;
    }
    if (basePyramid > 0 && apexPyramid > 0) {
      if (basePyramid > apexPyramid) {
        this._basePyramid = basePyramid;
        this._apexPyramid = apexPyramid;
      }
    }
  }

  incrementStep() {
    this._currentStep = this._currentStep + 1;
  }

}
