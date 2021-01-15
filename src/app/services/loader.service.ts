import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private _isVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  show() {
    this._isVisible$.next(true);
  }

  hide() {
    this._isVisible$.next(false);
  }

  isVisible() {
    return this._isVisible$.asObservable().pipe(share())
  }

}
