export class Training {
  //#region private properties
  private _pyramidBase: number;
  private _pyramidApex: number;
  //#endregion

  //#region getter/setter
  get pyramidBase(): number {
    return this._pyramidBase;
  }
  get pyramidApex(): number {
    return this._pyramidApex;
  }
  //#endregion

  //#region public properties
  name: string;
  restTimeStepMilliseconds: number;
  //#endregion

}
