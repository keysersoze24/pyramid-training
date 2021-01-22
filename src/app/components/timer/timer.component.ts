import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { RestTime } from 'src/app/models/rest-time';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnChanges {

  @Input() restTime: RestTime;
  @Input() countdown: boolean;

  constructor(public trainingService: TrainingService, private cd: ChangeDetectorRef) { }

  ngOnChanges(): void {
    this.cd.detectChanges();
  }



}
