import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config';
import { TimerModesEnum } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: AppConfig = new AppConfig();

  constructor() {
    this.config.timerMode = TimerModesEnum.Countdown;
  }
}
