import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { RestTime } from 'src/app/models/rest-time';
import { TimerService } from 'src/app/services/timer.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  @Input() countdown: boolean;

  constructor(public timerService: TimerService) { }



}
