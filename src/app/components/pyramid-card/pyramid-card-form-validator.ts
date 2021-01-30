import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Pyramid } from "src/app/models/pyramid";

export class PyramidCardFormValidator {
  private _formGroup: FormGroup;
  get formGroup(): FormGroup  { return this._formGroup };

  get basePyramid() { return this._formGroup.get('basePyramid') };
  get apexPyramid() { return this._formGroup.get('apexPyramid') };
  get restSeconds() { return this._formGroup.get('restSeconds') };
  get restSecondsShot() { return this._formGroup.get('restSecondsShot') };
  get reverse() { return this._formGroup.get('reverse') };

  constructor(fb: FormBuilder, pyramid: Pyramid) {
    this._formGroup = fb.group({
      basePyramid: [pyramid?.basePyramid, [Validators.required, Validators.min(1)]],
      apexPyramid: [pyramid?.apexPyramid, [Validators.required, Validators.min(1)]],
      restSeconds: [pyramid?.restTime?.restSeconds, [Validators.required, Validators.min(1)]],
      restSecondsShot: [pyramid?.restTimeShots?.restSeconds, [Validators.required, Validators.min(1)]],
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
