import { Component, Input } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  @Input() countdown: boolean;

  constructor(public timerService: TimerService) {
    this.timerService.getSecondsLeft().subscribe(res => {
      console.log(res);
    })
  }



}
