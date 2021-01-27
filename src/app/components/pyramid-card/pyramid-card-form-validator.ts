import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Pyramid } from "src/app/models/pyramid";

export class PyramidCardFormValidator {
  private _formGroup: FormGroup;
  get formGroup(): FormGroup  { return this._formGroup };

  get basePyramid() { return this._formGroup.get('basePyramid') };
  get apexPyramid() { return this._formGroup.get('apexPyramid') };
  get restTime() { return this._formGroup.get('restTime') };
  get restTimeReps() { return this._formGroup.get('restTimeReps') };
  get reverse() { return this._formGroup.get('reverse') };

  constructor(fb: FormBuilder, pyramid: Pyramid) {
    this._formGroup = fb.group({
      basePyramid: [pyramid?.basePyramid, [Validators.required, Validators.min(1)]],
      apexPyramid: [pyramid?.apexPyramid, [Validators.required, Validators.min(1)]],
      restTime: [pyramid?.restTime?.secondsSet, [Validators.required, Validators.min(1)]],
      restTimeReps: [pyramid?.restTimeShots?.secondsSet, [Validators.required, Validators.min(1)]],
      reverse: [new Boolean(pyramid?.reverse).valueOf()]
    })

    this.basePyramid.setValidators(this.greaterThan('apexPyramid'));
  }

  private greaterThan(field: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const group = control.parent;
      const fieldToCompare = group.get(field);
      const isLessThan = Number(fieldToCompare.value) >= Number(control.value);
      return isLessThan ? {'lessOrEqualThan': {value: control.value}} : null;
    }
  }

}
