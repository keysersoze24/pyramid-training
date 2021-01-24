import { Injectable } from '@angular/core';
import Timer from 'tiny-timer';
import { RestTime } from '../models/rest-time';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  currentRestTime: RestTime;

  constructor() { }
}
