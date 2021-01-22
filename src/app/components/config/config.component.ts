import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { TimerModesEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  TimerModesEnum = TimerModesEnum;

  constructor(public configService: ConfigService) { }

  ngOnInit(): void {
  }

  onTimerModeChange(countdownMode: boolean) {
    if (countdownMode) {
      this.configService.config.timerMode = TimerModesEnum.Countdown;
    } else {
      this.configService.config.timerMode = TimerModesEnum.Increment;
    }
  }

}
