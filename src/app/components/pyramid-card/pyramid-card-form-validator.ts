import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Pyramid } from "src/app/models/pyramid";

export class PyramidCardFormValidator {
  private _formGroup: FormGroup;
  get formGroup(): FormGroup  { return this._formGroup };

  get basePyramid() { return this._formGroup.get('basePyramid') };
  get apexPyramid() { return this._formGroup.get('apexPyramid') };
  get restTime() { return this._formGroup.get('restTime') };
  get reverse() { return this._formGroup.get('reverse') };

  constructor(fb: FormBuilder, pyramid: Pyramid) {
    this._formGroup = fb.group({
      basePyramid: [pyramid?.basePyramid],
      apexPyramid: [pyramid?.apexPyramid],
      restTime: [pyramid?.restTime?.secondsSet, [Validators.min(1)]],
      reverse: [pyramid?.reverse]
    })
  }

}
