import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: AppConfig;

  constructor() {
    this.config = new AppConfig();
    this.config.countdownTimer = true;
  }
}
